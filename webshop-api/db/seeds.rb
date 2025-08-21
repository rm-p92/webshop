require "faker"
include ERB::Util

# Wipe data (order matters for foreign keys)
CartItem.destroy_all
Cart.destroy_all
OrderItem.destroy_all
Order.destroy_all
Book.destroy_all
Author.destroy_all
Genre.destroy_all
User.destroy_all
Role.destroy_all


# Roles
admin_role    = Role.find_or_create_by!(name: "admin")
customer_role = Role.find_or_create_by!(name: "customer")

# Admin user
User.create!(
  first_name: "Admin",
  last_name: "User",
  email: "admin@webshop.com",
  password: "password123",
  password_confirmation: "password123",
  role: admin_role
)

# Normal users
[
  {first_name: "User", last_name: "One", email: "user1@webshop.com"},
  {first_name: "User", last_name: "Two", email: "user2@webshop.com"},
].each do |data|
  user = User.create!(
    first_name: data[:first_name],
    last_name: data[:last_name],
    email: data[:email],
    password: "password123",
    password_confirmation: "password123",
    role: customer_role
  )
  Cart.create!(user: user)
end

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

puts "Seeded #{Book.count} books, #{Author.count} authors, #{Genre.count} genres, #{User.count} users, #{Role.count} roles"