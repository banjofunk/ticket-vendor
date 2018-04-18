admin = User.create(
  email:"test@test.com",
  password: "test",
  password_confirmation: "test")
admin.save

layouts = {
  '' => "<g class='code'>
      <text x='195' y='1110' font-size='55'>{{code}}</text>
      <g class='code' transform='translate(415, 1180)'>
        <text class='expire_month' x='0' y='0'>{{expire_month}}</text>
        <text class='expire_day' x='50' y='0'>{{expire_day}}</text>
        <text class='expire_year' x='100' y='0'>{{expire_year}}</text>
      </g>
    </g>",
  'Code128' => "<g class='code'>
        <g class='barcode' transform='translate(30, 1025)'>
          {{{barcode}}}
        </g>
        <text x='230' y='1160'>{{code}}</text>
        <g class='code' transform='translate(415, 1180)'>
          <text class='expire_month' x='0' y='0'>{{expire_month}}</text>
          <text class='expire_day' x='50' y='0'>{{expire_day}}</text>
          <text class='expire_year' x='100' y='0'>{{expire_year}}</text>
        </g>
    </g>",
  'Code39' => "<g class='barcode' transform='translate(60, 1025)'>
      {{{barcode}}}
      <text x='200' y='135'>{{code}}</text>
      <text class='expire_month' x='350' y='155'>{{expire_month}}</text>
      <text class='expire_day' x='400' y='155'>{{expire_day}}</text>
      <text class='expire_year' x='450' y='155'>{{expire_year}}</text>
  </g>"
}

attraction = Attraction.create(
  active: true,
  name: 'BROADWAY GRAND PRIX',
  description: 'Here is the description.',
  position: 23,
  symbology: 'Code128'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/broadway_grand_prix-32.jpeg',
  attraction_id: 10,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult Pro (60" and taller) Unlimited ride wristband',
  msrp: 3495,
  net_price: 2995
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/broadway_grand_prix-33.jpeg',
  attraction_id: 10,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Intermediate (48"-59") Unlimited Ride Wristband',
  msrp: 2995,
  net_price: 2795
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/broadway_grand_prix-34.jpeg',
  attraction_id: 10,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Rookie (under 47") Unlimited ride wristband',
  msrp: 2495,
  net_price: 2495
)

attraction = Attraction.create(
  active: true,
  name: 'RIPLEYS 5D THEATRE',
  description: '',
  position: 25,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_5d_theatre-24.jpeg',
  attraction_id: 23,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'child admission (ages under 12)',
  msrp: 999,
  net_price: 995
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_5d_theatre-23.jpeg',
  attraction_id: 23,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'adult admission (ages 12+)',
  msrp: 1499,
  net_price: 1395
)

attraction = Attraction.create(
  active: true,
  name: 'MEDIEVAL TIMES DINNER AND TOURNAMENT',
  description: '',
  position: 3,
  symbology: 'Code128'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/medieval_times_dinner_and_tournament-16.jpeg',
  attraction_id: 19,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult Dinner and Show (ages 12+)',
  msrp: 5395,
  net_price: 3995
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/medieval_times_dinner_and_tournament-17.jpeg',
  attraction_id: 19,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child Dinner and Show (ages 12 and under) ',
  msrp: 2695,
  net_price: 2695
)

attraction = Attraction.create(
  active: true,
  name: 'LEGENDS IN CONCERT',
  description: '',
  position: 4,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/legends_in_concert-31.jpeg',
  attraction_id: 20,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'adult admission (ages 16+) RESERVATION ONLY',
  msrp: 4595,
  net_price: 2995
)

attraction = Attraction.create(
  active: true,
  name: 'ROCKIN JUMP',
  description: '',
  position: 5,
  symbology: 'Code39'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/rockin_jump-30.jpeg',
  attraction_id: 21,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: '60 minute jumping session all ages',
  msrp: 1000,
  net_price: 995
)

attraction = Attraction.create(
  active: true,
  name: 'MYRTLE BEACH WATER SPORTS',
  description: '',
  position: 7,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_beach_water_sports-47.jpeg',
  attraction_id: 8,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult Cruise (ages 13+) RESERVATION ONLY',
  msrp: 2500,
  net_price: 1995
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_beach_water_sports-50.jpeg',
  attraction_id: 8,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child Cruise (ages 3 - 12)',
  msrp: 1500,
  net_price: 1495
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_beach_water_sports-51.jpeg',
  attraction_id: 8,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: '2 hour Jet Ski Guided Dolphin Tour',
  msrp: 16500,
  net_price: 14995
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_beach_water_sports-27.jpeg',
  attraction_id: 8,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: '1 hour Jet Ski Rentals',
  msrp: 10500,
  net_price: 9995
)

attraction = Attraction.create(
  active: true,
  name: 'SKYWHEEL',
  description: '',
  position: 10,
  symbology: 'Code128'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/skywheel-45.jpeg',
  attraction_id: 17,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult Ride (ages 12+)',
  msrp: 1400,
  net_price: 1195
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/skywheel-46.jpeg',
  attraction_id: 17,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child Ride (ages 3-11)',
  msrp: 900,
  net_price: 795
)

attraction = Attraction.create(
  active: true,
  name: 'RIPLEYS HAUNTED ADVENTURE',
  description: '',
  position: 13,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_haunted_adventure-25.jpeg',
  attraction_id: 25,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'adult admission (ages 12+)',
  msrp: 1399,
  net_price: 1395
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_haunted_adventure-26.jpeg',
  attraction_id: 25,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'child admission',
  msrp: 999,
  net_price: 995
)

attraction = Attraction.create(
  active: true,
  name: 'WonderWorks',
  description: 'WonderWorks is wonderful! Find Wonder In YOUR Work!',
  position: 6,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/wonderworks-69.jpeg',
  attraction_id: 6,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Senior All Access (60+)  ',
  msrp: 1799,
  net_price: 1795
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/wonderworks-5.jpeg',
  attraction_id: 6,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult All Access  (ages 12+)',
  msrp: 2799,
  net_price: 1995
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/wonderworks-7.jpeg',
  attraction_id: 6,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'VIP Combo  Adult (ages 12+)',
  msrp: 3999,
  net_price: 2995
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/wonderworks-6.jpeg',
  attraction_id: 6,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child All Access (ages 4-12)  ',
  msrp: 1799,
  net_price: 1795
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/wonderworks-49.jpeg',
  attraction_id: 6,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Invalid - Do Not Use',
  msrp: 1799,
  net_price: 1795
)

attraction = Attraction.create(
  active: true,
  name: 'MYRTLE WAVES',
  description: '',
  position: 19,
  symbology: 'Code39'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_waves-56.jpeg',
  attraction_id: 16,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child (under 48") General Admission Ticket',
  msrp: 2199,
  net_price: 1895
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_waves-55.jpeg',
  attraction_id: 16,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: '1 Adult/Teen (48" and up) General Admission Ticket',
  msrp: 2799,
  net_price: 1995
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/myrtle_waves-64.jpeg',
  attraction_id: 16,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: '1 Adult/Teen (48" and up) General Admission Ticket',
  msrp: 2799,
  net_price: 1995
)

attraction = Attraction.create(
  active: true,
  name: 'BROOKGREEN GARDENS',
  description: '',
  position: 21,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/brookgreen_gardens-36.jpeg',
  attraction_id: 13,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Senior Admission (ages 64 and over)',
  msrp: 1395,
  net_price: 1395
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/brookgreen_gardens-35.jpeg',
  attraction_id: 13,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult Admission (ages 12+)',
  msrp: 1600,
  net_price: 1495
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/brookgreen_gardens-37.jpeg',
  attraction_id: 13,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child Admission (ages 4-12) ',
  msrp: 800,
  net_price: 795
)

attraction = Attraction.create(
  active: true,
  name: 'MUTINY BAY',
  description: '',
  position: 9,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/mutiny_bay-60.jpeg',
  attraction_id: 12,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child (10 and under)18 hole round of miniature golf',
  msrp: 0,
  net_price: 0
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/mutiny_bay-14.jpeg',
  attraction_id: 12,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult (11 and up)18 hole round of miniature golf',
  msrp: 1000,
  net_price: 795
)

attraction = Attraction.create(
  active: true,
  name: 'TUPELO BAY GOLF CENTER',
  description: '',
  position: 24,
  symbology: 'Code128'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/tupelo_bay_golf_center-58.jpeg',
  attraction_id: 5,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child (10 and under) 18 hole round of miniature golf',
  msrp: 850,
  net_price: 795
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/tupelo_bay_golf_center-13.jpeg',
  attraction_id: 5,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult (11 and up)18 hole round of miniature golf',
  msrp: 1000,
  net_price: 900
)

attraction = Attraction.create(
  active: true,
  name: 'RIPLEYS BELIEVE IT OR NOT',
  description: '',
  position: 27,
  symbology: 'Code39'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_believe_it_or_not-20.jpeg',
  attraction_id: 24,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'adult admission (ages 12+)',
  msrp: 1499,
  net_price: 1395
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_believe_it_or_not-21.jpeg',
  attraction_id: 24,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'child admission ticket (ages under 12)',
  msrp: 999,
  net_price: 995
)

attraction = Attraction.create(
  active: true,
  name: 'CANCUN LAGOON',
  description: '',
  position: 28,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/cancun_lagoon-15.jpeg',
  attraction_id: 9,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Adult (11 and up)18 hole round of miniature golf',
  msrp: 1000,
  net_price: 795
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/cancun_lagoon-59.jpeg',
  attraction_id: 9,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Child (10 and under) 18 hole round of miniature golf',
  msrp: 850,
  net_price: 795
)

attraction = Attraction.create(
  active: true,
  name: 'Hollywood Wax Museum',
  description: '',
  position: 29,
  symbology: 'Code39'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/hollywood_wax_museum-8.jpeg',
  attraction_id: 3,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'General Admission Adult   (ages 12+)',
  msrp: 2099,
  net_price: 1999
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/hollywood_wax_museum-9.jpeg',
  attraction_id: 3,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'General Admission Child (ages 4-11) ',
  msrp: 1299,
  net_price: 1199
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/hollywood_wax_museum-48.jpeg',
  attraction_id: 3,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'All Access Child (ages 4-11)',
  msrp: 1899,
  net_price: 1795
)

attraction.promotions.create(
  active: false,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/hollywood_wax_museum-10.jpeg',
  attraction_id: 3,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'All access - Adult (ages 12+)',
  msrp: 2799,
  net_price: 2499
)

attraction = Attraction.create(
  active: true,
  name: 'Kaminski House Museum',
  description: 'Located in historic Georgetown, South Carolina, the Kaminski House Museum and the Stewart Parker House offer antiques, architecture, and history all wrapped up in a bow of Southern hospitality. Meticulously preserved, you will experience life in Georgetown from the 18th Century though the two Great Wars as you take a guided tour and listen to intriguing tales of South Carolinians. Tour times: 11:00 AM, 1:00 PM, and 3:00 PM Monday - Saturday.',
  position: 32,
  symbology: 'Code39'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/kaminski_house_museum-74.jpeg',
  attraction_id: 37,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'Admission',
  msrp: 1200,
  net_price: 1100
)

attraction = Attraction.create(
  active: true,
  name: 'RIPLEYS MIRROR MAZE',
  description: '',
  position: 33,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_mirror_maze-22.jpeg',
  attraction_id: 22,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'all ages admission',
  msrp: 999,
  net_price: 795
)

attraction = Attraction.create(
  active: true,
  name: 'FAMILY KINGDOM',
  description: '',
  position: 34,
  symbology: ''
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/family_kingdom-28.jpeg',
  attraction_id: 26,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'all ages unlimited ride wristband',
  msrp: 2795,
  net_price: 2495
)

attraction = Attraction.create(
  active: true,
  name: 'Ripleys Aquarium',
  description: '',
  position: 35,
  symbology: 'Code128'
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_aquarium-1.jpeg',
  attraction_id: 1,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'General Admission Adult (ages 12+)',
  msrp: 2699,
  net_price: 1995
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_aquarium-2.jpeg',
  attraction_id: 1,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'General Admission Child (ages 6-11)',
  msrp: 1999,
  net_price: 1795
)

attraction.promotions.create(
  active: true,
  background: 'https://s3-us-west-2.amazonaws.com/ticket-vendor/ripleys_aquarium-3.jpeg',
  attraction_id: 1,
  deleted: false,
  layout: layouts[attraction.symbology],
  title: 'General Admission Child (ages 2-5)',
  msrp: 999,
  net_price: 795
)

tax1 = Tax.create(
  kind: 0,
  amount: 50,
  description: 'SC State admissions tax'
)

tax2 = Tax.create(
  kind: 0,
  amount: 15,
  description: 'Horry County (inside city limits)'
)

Tax.create(
  kind: 0,
  amount: 25,
  description: ' Horry County (outside city limits)'
)

Tax.create(
  kind: 0,
  amount: 15,
  description: 'Horry County Hospitality Tax'
)

tax3 = Tax.create(
  kind: 0,
  amount: 10,
  description: 'City of Myrtle Beach'
)

Tax.create(
  kind: 0,
  amount: 10,
  description: 'City of North Myrtle Beach'
)


Attraction.all.each do |attraction|
  attraction.update_attributes(
    logo: "https://s3-us-west-2.amazonaws.com/ticket-vendor/#{attraction.name.downcase.gsub(' ', '_')}_logo.jpg",
    attraction_image: "https://s3-us-west-2.amazonaws.com/ticket-vendor/#{attraction.name.downcase.gsub(' ', '_')}_attraction_image.jpg"
  )
  attraction.promotions.each do |promotion|
    case attraction.symbology
    when ''
      count = 6
    when 'Code39'
      count = 16
    when 'Code128'
      count = 12
    end
    50.times do
      code = SecureRandom.hex.upcase[0..count]
      promotion.admissions.create(code: code)
    end
    promotion.taxes << [tax1, tax2, tax3]
  end
end
