module Compass::ImportOnce::Importer
  def mtime(uri, options, *args)
    if uri =~ /^\(NOT IMPORTED\) (.*)$/
      #### quick workaround failing cached case
      #### not sure why but this importer cant find sprite folders when the stylesheet is cached
      File.exist?($1) && File.mtime($1)
    else
      super
    end
  end
end
