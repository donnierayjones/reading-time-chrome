task :package do
  files = [
    'manifest.json',
    'jquery.js',
    'script.js',
    'icon128.png',
    'icon48.png',
    'icon16.png'
  ]
  filelist = files.join(" ")
  %x[zip package.zip #{filelist}]
end

task :default => :package
