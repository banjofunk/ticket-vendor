admin = User.create(
  email:"admin@admin.com",
  password: "testeroo",
  password_confirmation: "testeroo")
admin.roles << "admin"
admin.save

agent = User.create(
  email:"agent@agent.com",
  password: "testeroo",
  password_confirmation: "testeroo")
agent.roles << "agent"
agent.save

client = User.create(
  email:"client@client.com",
  password: "testeroo",
  password_confirmation: "testeroo")
client.roles << "client"
client.save

banner1 = Image.create kind: Image::BANNER, src: "https://s3-us-west-2.amazonaws.com/ticketing-for-less/mainBanner-83497.png"
banner2 = Image.create kind: Image::BANNER, src: "https://s3-us-west-2.amazonaws.com/ticketing-for-less/ticketsBanner-83953.jpg"

page = Page.create(
  name: "home",
  content: {})
  banner_collection = page.banner_collection
  banner_collection.banner_collection_images.create(image_id: banner1.id, position: 2)
  banner_collection.banner_collection_images.create(image_id: banner2.id, position: 1)

page = Page.create(
  name: "tickets",
  content: {"titleText"=>"Special Attractions", "mainText"=>"Ticket Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Ripley’s Aquarium is the biggest attraction in Myrtle Beach and draws visitors from miles away to explore the world-class aquarium. There are plenty of other Ripley’s attractions to choose from, as well. Another favorite is the Family Kingdom Amusement Park & Water Park. Have fun exploring all the great attractions in Myrtle Beach."})
  banner_collection = page.banner_collection
  banner_collection.banner_collection_images.create(image_id: banner1.id, position: 2)
  banner_collection.banner_collection_images.create(image_id: banner2.id, position: 1)

page = Page.create(
  name: "about",
  content: {"titleText"=>"About Us", "mainText"=>"Abouts Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Ripley’s Aquarium is the biggest attraction in Myrtle Beach and draws visitors from miles away to explore the world-class aquarium. There are plenty of other Ripley’s attractions to choose from, as well. Another favorite is the Family Kingdom Amusement Park & Water Park. Have fun exploring all the great attractions in Myrtle Beach."})
  banner_collection = page.banner_collection
  banner_collection.banner_collection_images.create(image_id: banner1.id, position: 2)
  banner_collection.banner_collection_images.create(image_id: banner2.id, position: 1)

page = Page.create(
  name: "contact",
  content: {"titleText"=>"Contact Us", "mainText"=>"Contact Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Ripley’s Aquarium is the biggest attraction in Myrtle Beach and draws visitors from miles away to explore the world-class aquarium. There are plenty of other Ripley’s attractions to choose from, as well. Another favorite is the Family Kingdom Amusement Park & Water Park. Have fun exploring all the great attractions in Myrtle Beach."})
  banner_collection = page.banner_collection
  banner_collection.banner_collection_images.create(image_id: banner1.id, position: 1)
  banner_collection.banner_collection_images.create(image_id: banner2.id, position: 2)

img = Image.create kind: Image::LOGO, src: "https://s3-us-west-2.amazonaws.com/ticketing-for-less/aquaLogo-72962.png"
Attraction.create name: "Ripleys Aquarium",
                 active?: true,
                 logo_image_id: img.id,
                 attraction?: true,
                 resort?: false,
                 sponsor?:false,
                 short_description: "this is just the short description. just imagine how good the full description is going to be!!",
                 description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to “Swim with the Stingrays” or explore a Behind the Scenes tour. Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"

img = Image.create kind: Image::LOGO, src: "https://s3-us-west-2.amazonaws.com/ticketing-for-less/pizza_logo-73224.jpg"
Attraction.create name: "California Pizza",
                 active?: true,
                 logo_image_id: img.id,
                 attraction?: false,
                 resort?: false,
                 sponsor?:true,
                 short_description: "this is just the short description. just imagine how good the full description is going to be!!",
                 description: "California Pizza is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to “Swim with the Stingrays” or explore a Behind the Scenes tour. Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"

img = Image.create kind: Image::LOGO, src: "https://s3-us-west-2.amazonaws.com/ticketing-for-less/wax_museum_logo-73258.jpg"
Attraction.create name: "Hollywood Wax Museum",
                 active?: true,
                 logo_image_id: img.id,
                 attraction?: true,
                 resort?: false,
                 sponsor?:true,
                 short_description: "this is just the short description. just imagine how good the full description is going to be!!",
                 description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to “Swim with the Stingrays” or explore a Behind the Scenes tour. Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"

img = Image.create kind: Image::PROMO, src: "https://s3-us-west-2.amazonaws.com/ticketing-for-less/aquaImg.jpg"
Promotion.create attraction_id: 1,
                 active?: true,
                 title: "Ripley’s Aquarium",
                 subtitle: "1110 Celebrity Circle Myrtle Beach, SC 29577 \n Opening Hours: Sun - Thur 9 am - 7 pm, Fri 9 am - 5 pm, Sat 9 am - 8 pm \n Planet Jellies NOW OPEN!",
                 short_description: "this is just the short description. just imagine how good the full description is going to be!!",
                 description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to \“Swim with the Stingrays\” or explore a Behind the Scenes tour. \n Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!",
                 image_id: img.id,
                 retail_in_cents: 2699,
                 net_price: 1999
Promotion.create attraction_id: 1,
                 active?: true,
                 title: "Another Aquarium",
                 subtitle: "1110 Celebrity Circle Myrtle Beach, SC 29577 \n Opening Hours: Sun - Thur 9 am - 7 pm, Fri 9 am - 5 pm, Sat 9 am - 8 pm \n Planet Jellies NOW OPEN!",
                 short_description: "this is just the short description. just imagine how good the full description is going to be!!",
                 description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to \“Swim with the Stingrays\” or explore a Behind the Scenes tour. \n Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!",
                 image_id: img.id,
                 retail_in_cents: 2699,
                 net_price: 1999
