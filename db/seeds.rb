admin = User.create(
  email:"admin@admin.com",
  password: "testtest",
  password_confirmation: "testtest")
admin.roles << :admin
admin.save

banner_a = "https://s3-us-west-2.amazonaws.com/ticketing-for-less/mainBanner-83497.png"
banner_b = "https://s3-us-west-2.amazonaws.com/ticketing-for-less/ticketsBanner-83953.jpg"

page = Page.create(
  name: "home",
  content: {})
page.banners.create src: banner_a
page.banners.create src: banner_b

page = Page.create(
  name: "tickets",
  content: {
    text: "Ticket Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Ripley’s Aquarium is the biggest attraction in Myrtle Beach and draws visitors from miles away to explore the world-class aquarium. There are plenty of other Ripley’s attractions to choose from, as well. Another favorite is the Family Kingdom Amusement Park & Water Park. Have fun exploring all the great attractions in Myrtle Beach."
  }
)
page.banners.create src: banner_a
page.banners.create src: banner_b

page = Page.create(
  name: "about",
  content: {
    text: "Abouts Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Ripley’s Aquarium is the biggest attraction in Myrtle Beach and draws visitors from miles away to explore the world-class aquarium. There are plenty of other Ripley’s attractions to choose from, as well. Another favorite is the Family Kingdom Amusement Park & Water Park. Have fun exploring all the great attractions in Myrtle Beach."
  }
)
page.banners.create src: banner_a
page.banners.create src: banner_b

page = Page.create(
  name: "contact",
  content: {
    text: "Contact Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Ripley’s Aquarium is the biggest attraction in Myrtle Beach and draws visitors from miles away to explore the world-class aquarium. There are plenty of other Ripley’s attractions to choose from, as well. Another favorite is the Family Kingdom Amusement Park & Water Park. Have fun exploring all the great attractions in Myrtle Beach."
  }
)
page.banners.create src: banner_a
page.banners.create src: banner_b

logo = "https://s3-us-west-2.amazonaws.com/ticketing-for-less/aquaLogo-72962.png"
attraction = Attraction.new(
  name: "Ripleys Aquarium",
  active?: true,
  attraction?: true,
  resort?: false,
  sponsor?:false,
  description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to “Swim with the Stingrays” or explore a Behind the Scenes tour. Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"
)
attraction.build_logo src: logo
attraction.save


logo = "https://s3-us-west-2.amazonaws.com/ticketing-for-less/pizza_logo-73224.jpg"
attraction = Attraction.new(
  name: "California Pizza",
  active?: true,
  attraction?: false,
  resort?: false,
  sponsor?:true,
  description: "California Pizza is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to “Swim with the Stingrays” or explore a Behind the Scenes tour. Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"
)
attraction.build_logo src: logo
attraction.save

logo = "https://s3-us-west-2.amazonaws.com/ticketing-for-less/wax_museum_logo-73258.jpg"
attraction = Attraction.new(
  name: "Hollywood Wax Museum",
  active?: true,
  attraction?: true,
  resort?: false,
  sponsor?:true,
  description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to “Swim with the Stingrays” or explore a Behind the Scenes tour. Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"
)
attraction.build_logo src: logo
attraction.save

promotion_image = "https://s3-us-west-2.amazonaws.com/ticketing-for-less/aquaImg.jpg"
promotion = attraction.promotions.new(
  title: "Adult General Admission",
  active?: true,
  msrp: 2699,
  price: 1999,
  description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to \“Swim with the Stingrays\” or explore a Behind the Scenes tour. \n Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"
)
promotion.build_promotion_image src: promotion_image
promotion.save

promotion = attraction.promotions.new(
  title: "Child General Admission",
  active?: true,
  msrp: 2699,
  price: 1999,
  description: "Ripley’s Aquarium is South Carolina’s \"Most Visited Attraction,\" located on 29th Avenue. North at Broadway at the Beach! Enjoy an 87,000-square foot attraction featuring thousands of marine animals. Come face-to-face with one of the largest collections of giant sharks on the East Coast as you ride along a 330-ft underwater moving glidepath. Ripley’s Aquarium also features hourly dive shows and a stingray petting area. Sign up to \“Swim with the Stingrays\” or explore a Behind the Scenes tour. \n Check out Ripley’s Aquarium’s Adventure Day Camps for an opportunity to drop off the kids for kids-only activities including crafts, games and fun! NEW for 2016 – PLANET JELLIES, our beautiful expansion to Ripley’s Aquarium of Myrtle Beach. With thousands of jellies surrounding you it will feel as if you’re in a different world! This transfixing gallery will mesmerize you with its backlit and color-changing displays. You will even be able to touch a real Jellyfish!"
)
promotion.build_promotion_image src: promotion_image
promotion.save
