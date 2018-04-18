Rake::Task['assets:clean'].enhance do
  Rake::Task['webpack:compile'].invoke
end
