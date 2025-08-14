# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "faker"
include ERB::Util

Book.destroy_all
Author.destroy_all
Genre.destroy_all

# Genres
fiction     = Genre.create!(name: "Fiction")
non_fiction = Genre.create!(name: "Non-fiction")

# 2nd Level
romance = Genre.create!(name: "Romance", parent: fiction)
horror  = Genre.create!(name: "Horror", parent: fiction)
fantasy = Genre.create!(name: "Fantasy", parent: fiction)

biography = Genre.create!(name: "Biography", parent: non_fiction)
history   = Genre.create!(name: "History", parent: non_fiction)

# 3rd Level
Genre.create!(name: "Contemporary Romance", parent: romance)
Genre.create!(name: "Historical Romance", parent: romance)

Genre.create!(name: "Memoir", parent: biography)
Genre.create!(name: "Celebrity Biography", parent: biography)

# Collect all genres except top-level for book assignment
genres = Genre.where.not(id: [fiction.id, non_fiction.id])

# Authors
authors = 10.times.map do
  Author.create!(
    name: Faker::Book.author,
    bio: Faker::Lorem.paragraph(sentence_count: 5)
  )
end

# Books
30.times do
  title = Faker::Book.title
  Book.create!(
    title: title,
    description: Faker::Lorem.paragraph(sentence_count: 8),
    cover_image: "https://placehold.co/300x400?text=#{url_encode(title)}",
    price: Faker::Commerce.price(range: 5.0..50.0),
    author: authors.sample,
    genre: genres.sample
  )
end

puts "Seeded #{Book.count} books, #{Author.count} authors, #{Genre.count} genres"