# Compass Configuration File
# http://compass-style.org/help/documentation/configuration-reference/
# Known issues:
# https://github.com/wvanbergen/chunky_png/issues/58

Encoding.default_external = "utf-8"

# Require any additional compass plugins here.
require 'json'
require 'compass/import-once/activate'
require File.expand_path('../sass/monkey-patches/import-once-fix', File.realdirpath(__FILE__))
require File.expand_path('../sass/monkey-patches/sprite-importer-fix', File.realdirpath(__FILE__))
require File.expand_path('../sass/monkey-patches/hide-comments', File.realdirpath(__FILE__))

# Set this to the root of your project when deployed:
http_path = "/"
project_path = File.expand_path("..", __FILE__)
css_dir = "css"
sass_dir = "."
sass_path = File.expand_path("..", __FILE__)
images_dir = "css/i"
sprite_load_path = File.expand_path("../sass/sp", __FILE__)
generated_images_dir = "css/si"
javascripts_dir = "js"

add_import_path "sass/modules"
add_import_path "sass/pages"
add_import_path "sass"
# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
output_style = :expanded
line_comments = false
sourcemap = false


on_sprite_saved do |filename|
    if File.exists?(filename)

        # remove the tailing hash of spirtes.
        oldfilename = File.expand_path(filename)
        filename = oldfilename.sub(/-s[a-z0-9]{10}\.png$/, '.png')
        FileUtils.mv oldfilename, filename

        # sometimes compass generates a png24 sprite even if all raw icons are png8.
        # so convert png24 sprites back to png8 if necessary.
        if is_png24(filename)
            # do nothing if the sprite is marked '-24'
            unless filename =~ /-24\.png$/
                %x[cd ~ && type pngquant &>/dev/null]
                if $?.success?
                    `pngquant 256 '#{filename}' --quality 99 --ext=.png --force`
                else
                    # no system pngquant, use npm pngquant instead
                    dir = Dir.pwd
                    pqpath = 'node_modules/.bin/pngquant'
                    until File.exists?(File.join(dir, pqpath)) or dir == '/' do
                        dir = File.expand_path('..', dir)
                    end
                    `#{File.join(dir, pqpath)} 256 '#{filename}' --quality 99 --ext=.png --force`
                end
            end
        end

    end
end



on_stylesheet_saved do |filename|
    if File.exists?(filename)
        css = File.read(filename)
        target = filename.sub(/\/(?:sass(?:\/pages|\/modules)?|component)\/([\w\-]+)(?:\/index|\/\1)?\.css$/, '/\1.css')
        if File.exists? target
            FileUtils.chmod 'u+w', target
        end
        File.open(target, 'w+') do |f|
            match = filename.match(/\/(?:sass(?:\/pages|\/modules)?|component)\/([\w\-]+)(?:\/index|\/\1)?\.css$/)
            out = css

            # remove the leading @charset declaration added by compass.
            out = out.gsub /^@charset.*$/, ''

            # replace background url() quotes
            out = out.gsub(/url\((['"])?(?:\.\.\/)*([\w\/\-.]+)\1\)/, 'url(\2)')

            # remove hash version
            out = out.gsub(/-s[a-z0-9]{10}\.png/, '.png')

            # temporarily remove the sourcemap comment
            if match
                out = out.gsub(/\n\/\*[#\@]\s?sourceMapping.+?\n/, "/*# sourceMappingURL=#{match[1]}.css.map */")
            end

            f.pos = 0
            f.write(out)
            if target != filename
                f.chmod(0444)
            end
        end
    end
end

on_sourcemap_saved do |filename|
    if File.exists?(filename)
        css = File.read(filename)
        target = filename.sub(/\/(?:sass(?:\/pages|\/modules)?|component)\/([\w\-]+)(?:\/index|\/\1)?\.css.map$/, '/\1.css.map')
        app = (filename.match '/static/(www|ecom|mis|ecommobile|epassport)/')[1]
        if target != filename
            File.open(target, 'w+') do |f|
                match = filename.match(/\/(?:sass(?:\/pages|\/modules)?|component)\/([\w\-]+)(?:\/index|\/\1)?\.css.map$/)
                map = JSON.parse(css)
                # rewirte sources
                map["sources"] = map["sources"].map do |src|
                    src = src.gsub /(\.\.\/)+[^"]+?gems/, "gems"
                    src = src.gsub /(\.\.\/)+/, "../../#{app}/"
                    src
                end
                # rewirte file
                map["file"] = "#{match[1]}.css"

                out = JSON.pretty_generate(map)

                f.pos = 0
                f.write out
            end
        end
    end
end

def is_png24(filename)
    !(`file '#{filename}'` =~ /8-bit\/color RGB/).nil?
end
