#!/usr/bin/env node
/**
 * generate-pages.js
 * Generates all SEO location pages for Powerline Maintenance.
 * Zero dependencies — uses only Node.js built-in fs and path.
 *
 * Usage: node generate-pages.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// 1. CONFIG
// ============================================================

const BUSINESS = {
  name: 'Powerline Maintenance',
  phone: '(864) 883-8752',
  phoneTel: '+18648838752',
  email: 'contact@powerlinelawn.com',
  url: 'https://powerlinelawn.com',
  founded: '2010',
};

const CITIES = [
  {
    slug: 'greenville',
    name: 'Greenville',
    county: 'Greenville County',
    blurbs: [
      'As the largest city in Upstate South Carolina, Greenville is known for its vibrant downtown, Falls Park on the Reedy, and the iconic Liberty Bridge. The tree-lined streets and well-maintained neighborhoods of communities like Augusta Road, North Main, and the East Side reflect a city that takes pride in its appearance. Powerline Maintenance helps Greenville homeowners and businesses maintain that standard with reliable, professional lawn care.',
      'Greenville\'s warm climate and mix of clay-heavy and loamy soils create unique challenges for lawn care. Warm-season grasses like Bermuda and Zoysia thrive here, but they need consistent attention to look their best through the hot summers and mild winters. Our crews understand the specific turf conditions across Greenville\'s diverse neighborhoods and adjust their approach accordingly.',
      'From the historic Pettigru district to the growing communities along Woodruff Road and Verdae, Greenville properties deserve a lawn care partner who understands the local landscape. Powerline Maintenance has been serving the greater Greenville area since 2010, building a reputation for dependable service and attention to detail that our clients count on season after season.',
    ],
  },
  {
    slug: 'spartanburg',
    name: 'Spartanburg',
    county: 'Spartanburg County',
    blurbs: [
      'Spartanburg, known as the Hub City, sits at the crossroads of several major highways in Upstate South Carolina. Home to a thriving arts scene, multiple colleges, and historic neighborhoods like Converse Heights and Hampton Heights, Spartanburg is a community that values its curb appeal. Powerline Maintenance provides professional lawn care to keep Spartanburg properties looking sharp all year long.',
      'The red clay soils common throughout Spartanburg County can be tough on lawns, leading to drainage issues and compaction if not managed properly. Our technicians are experienced with these local soil conditions and tailor mowing heights, fertilization schedules, and maintenance plans to help Spartanburg lawns overcome these challenges and stay thick and green.',
      'Whether your property is near Morgan Square downtown, along the Cottonwood Trail, or in one of the growing subdivisions off Reidville Road, Powerline Maintenance delivers consistent, professional service. We treat every Spartanburg lawn with the same care and precision that has earned us hundreds of satisfied clients across Upstate South Carolina.',
    ],
  },
  {
    slug: 'anderson',
    name: 'Anderson',
    county: 'Anderson County',
    blurbs: [
      'Anderson, the Electric City, has a rich history and a strong sense of community pride. Located near the shores of Lake Hartwell, Anderson offers a mix of established neighborhoods near downtown and newer developments spreading toward Clemson and Pendleton. Powerline Maintenance has been a trusted lawn care provider in Anderson since our founding in 2010, and we know these neighborhoods inside and out.',
      'Anderson\'s location in the western Upstate means slightly milder winters but hot, humid summers that demand consistent lawn maintenance. The mix of Bermuda, Fescue, and Zoysia lawns across Anderson requires a knowledgeable crew that can adjust techniques for each grass type. Our team brings that expertise to every property we service in the Anderson area.',
      'From the tree-lined streets near Anderson University to the lakeside properties along Highway 24, we provide reliable lawn care that Anderson homeowners and property managers depend on. Our consistent scheduling and attention to detail mean your property always looks its best, whether you are hosting a backyard gathering or simply enjoying a well-kept yard.',
    ],
  },
  {
    slug: 'greer',
    name: 'Greer',
    county: 'Greenville County',
    blurbs: [
      'Greer sits between Greenville and Spartanburg along the I-85 corridor and has experienced tremendous growth in recent years. With attractions like the BMW Zentrum and the charming downtown Trade Street district, Greer blends small-town character with modern development. Powerline Maintenance helps Greer homeowners and businesses keep pace with this growth through reliable, professional lawn care services.',
      'The rolling terrain around Greer, combined with clay-based soils and full-sun exposure common in newer subdivisions, creates specific challenges for maintaining healthy turf. Our crews understand how to manage mowing heights and maintenance schedules to keep Greer lawns thriving through the intense summer heat and occasional drought conditions that affect the area.',
      'Whether your property is in one of the established neighborhoods near downtown Greer or in the newer communities along Highway 14 and Suber Road, Powerline Maintenance provides the same consistent, detail-oriented service. We have built our reputation in the Upstate one lawn at a time, and Greer residents can count on us to deliver results.',
    ],
  },
  {
    slug: 'mauldin',
    name: 'Mauldin',
    county: 'Greenville County',
    blurbs: [
      'Mauldin is one of Greenville County\'s fastest-growing cities, located just south of Greenville along the busy Butler Road and Standing Springs Road corridors. Known for its family-friendly neighborhoods, excellent schools, and the popular Mauldin Cultural Center, this community takes pride in well-maintained properties. Powerline Maintenance helps Mauldin residents uphold that standard.',
      'Mauldin\'s mix of established neighborhoods with mature trees and newer developments with open lots means diverse lawn care needs across the city. Shaded yards near the older sections of town require different treatment than the sun-drenched lots in newer subdivisions. Our technicians assess each property and adjust their approach for optimal results.',
      'From properties along Bridges Road to the neighborhoods surrounding Sunset Park, Powerline Maintenance delivers dependable lawn care throughout Mauldin. Our crews arrive on schedule, use professional-grade equipment, and leave your property looking its best every visit.',
    ],
  },
  {
    slug: 'simpsonville',
    name: 'Simpsonville',
    county: 'Greenville County',
    blurbs: [
      'Simpsonville has grown from a quiet Southern town into one of Greenville County\'s most desirable communities. With the popular Simpsonville City Park, Heritage Park Amphitheater, and the charming downtown clock tower, Simpsonville offers a welcoming environment where well-kept lawns and landscapes are part of the local character. Powerline Maintenance is proud to serve this growing community.',
      'The suburban layout of Simpsonville means many properties feature larger yards with a mix of sun and shade conditions. The Fairview Road and Harrison Bridge Road corridors are home to numerous subdivisions where consistent lawn care makes a visible difference in property appearance. Our team knows these neighborhoods well and provides tailored maintenance for each property.',
      'Whether you live near the shops along Main Street, in the neighborhoods off Scuffletown Road, or in the developments along SE Main, Powerline Maintenance provides reliable, professional lawn care. We have been keeping Simpsonville lawns green and healthy since 2010, and our growing client base in the area speaks to the quality of our work.',
    ],
  },
  {
    slug: 'easley',
    name: 'Easley',
    county: 'Pickens County',
    blurbs: [
      'Easley is the largest city in Pickens County and serves as a gateway between the Greenville metro area and the Blue Ridge foothills. With its welcoming downtown, the popular Doodle Trail, and a strong sense of community, Easley is a city where property owners take pride in their landscapes. Powerline Maintenance has been a trusted lawn care partner in Easley since we first opened our doors.',
      'Easley\'s position at the edge of the foothills means varied terrain and soil conditions within the city. Properties closer to downtown tend to have more established landscapes with mature trees, while newer developments along Calhoun Memorial Highway and Powdersville Road feature open, sun-exposed lots. Our crews handle both with equal expertise.',
      'From the neighborhoods near Easley High School to the properties along Highway 123, Powerline Maintenance provides consistent, professional lawn care that Easley residents count on. We understand the local growing conditions and adjust our services to keep your lawn healthy and attractive through every season.',
    ],
  },
  {
    slug: 'clemson',
    name: 'Clemson',
    county: 'Pickens County',
    blurbs: [
      'Clemson is a vibrant college town nestled along the shores of Lake Hartwell, home to Clemson University and a community that bleeds orange and purple. Beyond the campus, Clemson features established residential neighborhoods, the South Carolina Botanical Garden, and scenic areas along the lake. Powerline Maintenance has been serving Clemson property owners since our founding, and we understand what makes this community unique.',
      'The hilly terrain around Clemson and the proximity to Lake Hartwell create microclimates that affect lawn health. Properties near the lake may deal with different moisture levels and soil types than those on higher ground near campus. Our team is experienced with these variations and adjusts mowing height, frequency, and care recommendations accordingly.',
      'Whether your property is near downtown Clemson along College Avenue, in the neighborhoods off Old Greenville Highway, or in the lakeside communities along Highway 76, Powerline Maintenance delivers reliable lawn care you can trust. Our long history in the Clemson area means we understand the seasonal rhythms and local conditions that affect your lawn.',
    ],
  },
  {
    slug: 'fountain-inn',
    name: 'Fountain Inn',
    county: 'Greenville County',
    blurbs: [
      'Fountain Inn straddles the Greenville-Laurens county line and has maintained its small-town charm even as the surrounding area grows rapidly. Known for the historic Fountain Inn Depot and the annual Dark Corner Sip & Stroll, this community values its character and appearance. Powerline Maintenance helps Fountain Inn property owners maintain beautiful lawns that complement the town\'s welcoming atmosphere.',
      'The agricultural heritage of the Fountain Inn area means many properties sit on rich, productive soil that can grow lush turf when properly maintained. However, the transition from farmland to residential development often leaves lawns with compacted subsoil that needs attention. Our crews understand these local conditions and provide the right care to keep Fountain Inn lawns thriving.',
      'From the historic homes near downtown to the newer subdivisions along Highway 418 and Fairview Road, Powerline Maintenance provides dependable lawn care throughout Fountain Inn. Our consistent service and attention to detail have made us a trusted name in communities across the southern Greenville County area.',
    ],
  },
  {
    slug: 'travelers-rest',
    name: 'Travelers Rest',
    county: 'Greenville County',
    blurbs: [
      'Travelers Rest, or TR as locals call it, sits at the base of the Blue Ridge Mountains and has become one of the Upstate\'s most popular destinations. The Swamp Rabbit Trail runs right through downtown, and the city\'s restaurants, breweries, and outdoor recreation opportunities draw visitors from across the region. Powerline Maintenance helps TR property owners keep their landscapes as inviting as the town itself.',
      'The mountainous terrain and higher elevation around Travelers Rest create cooler microclimates and different growing conditions than the lower Upstate. Fescue and other cool-season grasses are more common here, and the steeper lots require careful mowing techniques. Our crews are experienced with the unique turf management needs of the TR area.',
      'Whether your property is along Main Street in the walkable downtown, tucked into the hills along Highway 276, or in one of the neighborhoods near Furman University, Powerline Maintenance provides professional lawn care tailored to the Travelers Rest environment. We appreciate the natural beauty of this area and work to keep your property in harmony with its surroundings.',
    ],
  },
  {
    slug: 'seneca',
    name: 'Seneca',
    county: 'Oconee County',
    blurbs: [
      'Seneca is the largest city in Oconee County and a key hub for the western Upstate. Situated near Lake Keowee and the Blue Ridge foothills, Seneca offers a mix of lakeside living, historic charm along Ram Cat Alley, and convenient access to outdoor recreation. Powerline Maintenance extends our professional lawn care services to Seneca homeowners and businesses who want their properties looking their best.',
      'The western Upstate around Seneca sees slightly more rainfall than the eastern Upstate, and the proximity to the mountains means cooler evening temperatures that extend the growing season for some grass varieties. Our team understands these regional differences and adjusts fertilization, mowing schedules, and care plans to match the conditions Seneca lawns actually face.',
      'From the established neighborhoods near downtown Seneca to the lakeside properties along Highway 130 and the developments off Wells Highway, Powerline Maintenance provides reliable, professional lawn care. Our expansion into the Seneca area means Oconee County residents now have access to the same quality service that has made us a trusted name across the Upstate.',
    ],
  },
  {
    slug: 'taylors',
    name: 'Taylors',
    county: 'Greenville County',
    blurbs: [
      'Taylors is a growing community in northern Greenville County known for its convenient location along Wade Hampton Boulevard and proximity to both Greenville and Greer. The area features a mix of established neighborhoods and newer developments, with easy access to Paris Mountain State Park and the expanding commercial corridors along Wade Hampton. Powerline Maintenance serves Taylors residents with professional lawn care they can depend on.',
      'The terrain around Taylors ranges from the gentle slopes near Paris Mountain to the flatter areas along the main commercial corridors. This variety means lawn care needs differ from one neighborhood to the next. Our crews evaluate each property\'s specific conditions, including sun exposure, soil type, and grass variety, to deliver the right care at the right time.',
      'Whether your home is in one of the neighborhoods off North Pleasantburg, along East Lee Road, or near the shops on Wade Hampton Boulevard, Powerline Maintenance provides consistent, quality lawn care throughout the Taylors area. Our reliable scheduling and professional results keep your property looking great all season long.',
    ],
  },
  {
    slug: 'lyman',
    name: 'Lyman',
    county: 'Spartanburg County',
    blurbs: [
      'Lyman is a small but growing town in Spartanburg County, situated along the Middle Tyger River. Known for its proximity to the Inland Port and the redeveloped Lyman Mill, this community blends its textile heritage with modern growth. Powerline Maintenance provides professional lawn care to Lyman residents and businesses who value a well-maintained property.',
      'Lyman\'s location along the river means some properties deal with higher moisture levels and different soil compositions than the surrounding uplands. These conditions can affect turf health if not managed properly. Our technicians understand the drainage and soil challenges common in the Lyman area and tailor their services to keep lawns healthy despite these variables.',
      'From the homes near downtown Lyman to the growing residential areas along Highway 292 and Groce Road, Powerline Maintenance delivers the same reliable, professional service that has earned us trust across the Upstate. Lyman property owners appreciate our consistent scheduling and attention to detail on every visit.',
    ],
  },
  {
    slug: 'duncan',
    name: 'Duncan',
    county: 'Spartanburg County',
    blurbs: [
      'Duncan sits along the I-85 corridor between Spartanburg and Greer and has seen significant growth thanks to the BMW manufacturing plant and related development. This small town offers a mix of affordable housing, convenient access to major employers, and a growing commercial presence along Highway 290. Powerline Maintenance helps Duncan property owners keep their lawns looking great amid all this growth.',
      'The I-85 corridor around Duncan features a mix of newer subdivision development and older, established properties. Newer lots often have compacted builder-grade soil that needs proper aeration and care to establish healthy turf, while older properties may have mature trees that create shade management challenges. Our crews address both situations with proven techniques.',
      'Whether your property is near the growing commercial district along Highway 290, in one of the subdivisions off East Main Street, or along Berry Shoals Road, Powerline Maintenance provides dependable lawn care throughout Duncan. Our professional team ensures your property makes a great impression in this rapidly developing area.',
    ],
  },
  {
    slug: 'woodruff',
    name: 'Woodruff',
    county: 'Spartanburg County',
    blurbs: [
      'Woodruff is a small, tight-knit community in southern Spartanburg County with a proud agricultural heritage and a welcoming downtown centered around its historic main street. Properties in Woodruff often feature larger lots with room to spread out, and residents here take pride in maintaining their land. Powerline Maintenance provides professional lawn care that matches the standards of this hardworking community.',
      'The rural character of the Woodruff area means many properties sit on clay-based soils with larger turf areas than typical suburban lots. These bigger lawns require efficient, professional-grade equipment and experienced crews to maintain properly. Powerline Maintenance has the equipment and expertise to handle properties of all sizes in the Woodruff area.',
      'From the homes along Main Street to the farms and estates off Highway 101 and Cross Anchor Road, Powerline Maintenance delivers reliable lawn care throughout the Woodruff community. We understand the unique character of southern Spartanburg County and provide service that respects both the land and the people who live on it.',
    ],
  },
  {
    slug: 'boiling-springs',
    name: 'Boiling Springs',
    county: 'Spartanburg County',
    blurbs: [
      'Boiling Springs is one of Spartanburg County\'s fastest-growing communities, located south of Spartanburg along Highway 9. Named for the natural springs in the area, this community features numerous subdivisions, excellent schools, and a family-oriented atmosphere. Powerline Maintenance serves Boiling Springs residents with the professional lawn care this growing community deserves.',
      'The rapid residential development in Boiling Springs means many properties have newer lawns that are still establishing their root systems. These young lawns need careful mowing at the right height and frequency to develop strong, deep roots. Our crews understand the specific needs of newly established turf and provide maintenance that helps Boiling Springs lawns mature into thick, healthy turf.',
      'Whether your home is in the subdivisions along Highway 9, near Rainbow Lake, or in the neighborhoods off Parris Bridge Road, Powerline Maintenance provides consistent, professional lawn care throughout Boiling Springs. We have watched this community grow and are committed to helping residents maintain the appearance and value of their properties.',
    ],
  },
  {
    slug: 'five-forks',
    name: 'Five Forks',
    county: 'Greenville County',
    blurbs: [
      'Five Forks is an upscale community in southern Greenville County where Woodruff Road, Scuffletown Road, and Batesville Road converge. Known for its excellent schools, well-planned subdivisions, and convenient shopping, Five Forks attracts families who value quality in every aspect of their lives, including their lawn care. Powerline Maintenance provides the premium service that Five Forks homeowners expect.',
      'The manicured subdivisions throughout Five Forks feature a mix of Bermuda and Zoysia lawns with carefully planned landscaping. Maintaining these properties to neighborhood standards requires consistent, professional-grade care. Our crews pay close attention to edging, trimming, and cleanup details that make the difference between an adequate lawn and an exceptional one.',
      'From the established neighborhoods near Five Forks Plaza to the newer developments along Batesville Road and Standing Springs Road, Powerline Maintenance provides meticulous lawn care that Five Forks residents appreciate. Our reputation for reliability and quality makes us a natural fit for this community where appearances matter.',
    ],
  },
  {
    slug: 'powdersville',
    name: 'Powdersville',
    county: 'Anderson County',
    blurbs: [
      'Powdersville is a rapidly growing community straddling the Anderson-Greenville county line along Highway 153. With excellent schools, new retail development, and easy access to both Greenville and Anderson, Powdersville has become one of the Upstate\'s most sought-after areas for families. Powerline Maintenance provides professional lawn care to help Powdersville homeowners maintain their investments.',
      'The rolling terrain along the Highway 153 corridor creates varying drainage patterns that affect lawn health across Powdersville properties. Some lots face runoff challenges on slopes while others sit in lower areas that retain moisture. Our crews evaluate these conditions at each property and adjust mowing patterns, heights, and service schedules to produce the best results.',
      'Whether your property is in one of the subdivisions near Powdersville High School, along Highway 153, or in the neighborhoods off Moorefield Memorial Highway, Powerline Maintenance delivers reliable lawn care throughout the Powdersville area. Our professional approach and consistent results have made us a preferred provider in this growing community.',
    ],
  },
  {
    slug: 'pendleton',
    name: 'Pendleton',
    county: 'Anderson County',
    blurbs: [
      'Pendleton is one of the largest historic districts in the nation, with a charming town square, antebellum homes, and deep roots in South Carolina history. This small Anderson County town is home to Tri-County Technical College and sits between Clemson and Anderson along Highway 76. Powerline Maintenance provides lawn care services that respect Pendleton\'s historic character while keeping properties beautifully maintained.',
      'The historic properties around Pendleton\'s town square and along the surrounding streets often feature mature landscapes with established trees, foundation plantings, and traditional Southern lawns. Maintaining these properties requires a careful touch and an understanding of how to work around established plantings without damaging them. Our experienced crews provide exactly that level of care.',
      'From the historic homes around the Village Green to the newer neighborhoods along Highway 76 and Greenville Street, Powerline Maintenance offers professional lawn care throughout Pendleton. We understand that maintaining a property in a historic community carries additional responsibility, and we approach every Pendleton lawn with the respect it deserves.',
    ],
  },
  {
    slug: 'central',
    name: 'Central',
    county: 'Pickens County',
    blurbs: [
      'Central is a small Pickens County town located along Highway 93 between Clemson and Easley. Home to Southern Wesleyan University and a revitalized downtown district, Central offers a quiet, affordable lifestyle just minutes from the larger Upstate cities. Powerline Maintenance provides professional lawn care to Central residents who want their properties to look their best without the hassle of doing it themselves.',
      'Central\'s location in the foothills means slightly different growing conditions than the lower Upstate, with cooler temperatures that can extend the growing season for cool-season grasses. The town\'s mix of older homes with mature lots and newer developments means varied lawn care needs across the community. Our crews adapt their approach to match each property\'s specific conditions.',
      'Whether your property is near the Southern Wesleyan campus, along Church Street in the historic downtown, or in the residential areas off Highway 93, Powerline Maintenance delivers dependable lawn care throughout Central. We bring the same professional standards to this small-town community that we deliver across all of Upstate South Carolina.',
    ],
  },
  {
    slug: 'pickens',
    name: 'Pickens',
    county: 'Pickens County',
    blurbs: [
      'Pickens is the county seat of Pickens County, located in the foothills of the Blue Ridge Mountains. With easy access to Table Rock State Park, the Jocassee Gorges, and some of the best outdoor recreation in South Carolina, Pickens attracts residents who appreciate natural beauty. Powerline Maintenance helps Pickens property owners complement that natural beauty with well-maintained lawns and landscapes.',
      'The higher elevation and foothill terrain around Pickens create growing conditions that differ from the lower Upstate. Cool-season grasses do well here, and the slightly cooler temperatures and higher rainfall totals support lush growth when properly managed. Our team adjusts mowing frequencies and maintenance approaches to match the specific conditions found in the Pickens area.',
      'From the properties near the historic courthouse square to the homes along Highway 8 and the developing areas off Ann Street, Powerline Maintenance provides reliable, professional lawn care throughout Pickens. Our Upstate roots mean we understand the Blue Ridge foothill communities and deliver service that meets the expectations of Pickens County residents.',
    ],
  },
  {
    slug: 'gaffney',
    name: 'Gaffney',
    county: 'Cherokee County',
    blurbs: [
      'Gaffney, the Peach Capital of South Carolina, is known for its iconic Peachoid water tower visible from I-85 and its rich history in the textile and agriculture industries. As the largest city in Cherokee County, Gaffney serves as the commercial hub for the surrounding area. Powerline Maintenance extends our professional lawn care services to Gaffney homeowners and businesses looking for reliable, quality results.',
      'Cherokee County\'s red clay soils present specific challenges for lawn maintenance, including poor drainage after heavy rains and hard, cracked surfaces during dry spells. Proper mowing technique, appropriate cutting heights, and consistent scheduling help mitigate these issues and keep Gaffney lawns looking their best. Our experienced crews know how to work with these conditions effectively.',
      'Whether your property is near Limestone University, along the Floyd Baker Boulevard commercial corridor, or in one of the residential neighborhoods off Highway 11, Powerline Maintenance provides the consistent, professional lawn care that Gaffney properties deserve. Our expansion into Cherokee County brings our trusted Upstate service to the Gaffney community.',
    ],
  },
];

const SERVICES = [
  {
    slug: 'lawn-mowing',
    name: 'Lawn Mowing',
    included: [
      'Precision mowing at the optimal height for your grass type',
      'String trimming along fences, beds, and structures',
      'Edging along driveways, sidewalks, and curbs for a clean border',
      'Blowing of clippings off hard surfaces',
      'Lawn inspection for bare spots or pest activity',
      'Flexible weekly or bi-weekly scheduling',
      'Consistent crew assignments',
    ],
    intro: 'A well-maintained lawn starts with regular, professional mowing.',
    detail: 'We adjust cutting height and technique to match the specific needs of your turf, promoting healthier root development and a more resilient lawn over time. Consistent mowing encourages dense, lateral growth that naturally crowds out weeds and improves drought tolerance.',
    cityContext(city) {
      return `Our mowing crews know the turf conditions throughout ${city.name} and adjust cutting heights to match the grass types and sun exposure common in ${city.county} properties.`;
    },
  },
  {
    slug: 'lawn-fertilization',
    name: 'Lawn Fertilization',
    included: [
      'Soil analysis to determine nutrient needs',
      'Custom fertilization schedule for your grass type',
      'Slow-release granular applications for steady feeding',
      'Pre-emergent weed control treatments',
      'Post-emergent spot treatments as needed',
      'Seasonal adjustments for optimal nutrient timing',
      'pH balancing with lime applications when needed',
    ],
    intro: 'A thick, green lawn requires the right nutrients at the right time.',
    detail: 'Our fertilization programs are tailored to the specific soil and turf conditions of your property. We use slow-release formulations that feed your lawn steadily over weeks, not just days, promoting deep root growth and long-term turf health rather than short bursts of surface growth.',
    cityContext(city) {
      return `The soil conditions in ${city.name} and across ${city.county} vary from property to property. Our fertilization plans account for these local differences to deliver the nutrients your specific lawn needs.`;
    },
  },
  {
    slug: 'tree-shrub-care',
    name: 'Tree & Shrub Care',
    included: [
      'Professional pruning and shaping of ornamental trees',
      'Shrub trimming and hedge maintenance',
      'Deadwood removal and canopy thinning',
      'Disease and pest identification and treatment',
      'Seasonal pruning schedules for flowering shrubs',
      'Storm damage cleanup and limb removal',
      'Mulch ring maintenance around tree bases',
    ],
    intro: 'Healthy trees and shrubs frame your property and add lasting value.',
    detail: 'Our arborist-trained technicians prune and shape your trees and shrubs using proper horticultural techniques that promote healthy growth patterns. We time our pruning to match each species\' natural growth cycle, ensuring your ornamental plantings bloom their best and maintain an attractive shape year-round.',
    cityContext(city) {
      return `${city.name} properties feature a wide variety of ornamental trees and native species common to ${city.county}. Our crews are familiar with the species found throughout the area and apply proper care techniques for each.`;
    },
  },
  {
    slug: 'irrigation',
    name: 'Irrigation Services',
    included: [
      'Sprinkler system inspections and diagnostics',
      'Head replacement and nozzle adjustments',
      'Controller programming and seasonal adjustments',
      'Leak detection and pipe repair',
      'Zone balancing for even coverage',
      'Winterization and spring startup services',
      'Water efficiency assessments and recommendations',
    ],
    intro: 'Proper irrigation keeps your lawn and landscape healthy while conserving water.',
    detail: 'We service and maintain all major brands of residential and commercial irrigation systems. Our technicians ensure even coverage across your entire property, eliminate dry spots and overwatered areas, and program your controller for seasonal efficiency. A well-maintained system saves water, reduces your utility bills, and keeps your turf consistently green.',
    cityContext(city) {
      return `Many ${city.name} properties rely on irrigation systems to keep lawns green through the hot Upstate summers. Our irrigation technicians service systems throughout ${city.county} and understand the local water conditions and seasonal demands.`;
    },
  },
  {
    slug: 'garden-bed-maintenance',
    name: 'Garden Bed Maintenance',
    included: [
      'Regular weeding and weed prevention',
      'Mulch refreshing and replacement',
      'Edging along bed borders for a clean look',
      'Seasonal flower planting and rotation',
      'Perennial plant care and division',
      'Soil amendment and conditioning',
      'Debris removal and bed cleanup',
    ],
    intro: 'Well-maintained garden beds add color, texture, and value to your property.',
    detail: 'Our garden bed maintenance services keep your planting areas looking polished and healthy throughout the year. We handle weeding, mulching, edging, and seasonal plant care so your beds always complement your lawn. Proper mulch depth suppresses weeds, retains moisture, and gives your landscape a finished, professional appearance.',
    cityContext(city) {
      return `${city.name} homeowners take pride in their garden beds and landscape plantings. Our maintenance crews keep beds throughout ${city.county} looking their best with regular weeding, fresh mulch, and seasonal plant care.`;
    },
  },
  {
    slug: 'seasonal-cleanup',
    name: 'Seasonal Cleanup',
    included: [
      'Fall leaf removal from lawns and beds',
      'Spring debris and thatch removal',
      'Gutter cleaning and downspout clearing',
      'Bed preparation for spring planting',
      'Lawn aeration and overseeding (fall)',
      'Winter preparation and final mowing',
      'Property-wide debris haul-away',
    ],
    intro: 'Seasonal transitions require thorough cleanup to keep your property healthy and attractive.',
    detail: 'Our seasonal cleanup services prepare your property for the months ahead. In fall, we remove leaves, aerate compacted soil, and overseed thin areas to build a stronger lawn for spring. In spring, we clear winter debris, dethatch, and prepare garden beds for the growing season. These cleanups prevent turf damage and set the stage for a great-looking property all year.',
    cityContext(city) {
      return `The seasonal changes across ${city.name} and ${city.county} bring falling leaves in autumn and accumulated debris in spring. Our cleanup crews handle properties of all sizes to prepare your ${city.name} lawn for the season ahead.`;
    },
  },
];

// ============================================================
// 2. UTILITIES
// ============================================================

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function resolvePath(fromDepth, toPath) {
  if (fromDepth === 0) return toPath;
  const prefix = Array(fromDepth).fill('..').join('/');
  return prefix + '/' + toPath;
}

function rootPath(depth) {
  if (depth === 0) return '/';
  return '/';
}

// ============================================================
// 3. SHARED HTML PARTIALS
// ============================================================

function buildHead({ title, description, canonical, depth, extraHead = '' }) {
  const cssPath = resolvePath(depth, 'styles.css');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BUSINESS.url}/${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${BUSINESS.url}/${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssPath}">
${extraHead}</head>
<body>
`;
}

function buildHeader(depth) {
  return `<header class="header" id="header">
  <div class="container header__inner">
    <a href="/" class="logo" aria-label="Powerline Maintenance home">
      <span class="logo__power">POWERLINE</span> <span class="logo__line">MAINTENANCE</span>
    </a>
    <nav class="nav" id="nav" aria-label="Main navigation">
      <ul class="nav__list">
        <li><a href="/" class="nav__link">Home</a></li>
        <li><a href="/about.html" class="nav__link">About</a></li>
        <li><a href="/#services" class="nav__link">Services</a></li>
        <li><a href="/#gallery" class="nav__link">Gallery</a></li>
        <li><a href="/#testimonials" class="nav__link">Testimonials</a></li>
        <li><a href="/contact.html" class="nav__link">Contact</a></li>
      </ul>
    </nav>
    <a href="/contact.html" class="btn btn--primary header__cta">Get a Quote</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
`;
}

function buildFooter(depth) {
  const jsPath = resolvePath(depth, 'script.js');
  return `<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <a href="/" class="logo"><span class="logo__power">POWERLINE</span> <span class="logo__line">MAINTENANCE</span></a>
      <p>Professional lawn maintenance services for residential and commercial properties. We're dedicated to keeping your outdoor spaces looking their best year-round.</p>
    </div>
    <div class="footer__col">
      <h4>Services</h4>
      <ul>
        <li><a href="/services/lawn-mowing.html">Lawn Mowing</a></li>
        <li><a href="/services/lawn-fertilization.html">Lawn Fertilization</a></li>
        <li><a href="/services/tree-shrub-care.html">Tree &amp; Shrub Care</a></li>
        <li><a href="/services/irrigation.html">Irrigation Services</a></li>
        <li><a href="/services/garden-bed-maintenance.html">Garden Bed Maintenance</a></li>
        <li><a href="/services/seasonal-cleanup.html">Seasonal Cleanup</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/service-areas.html">Service Areas</a></li>
        <li><a href="/privacy-policy.html">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="container">
      <p>&copy; 2025 Powerline Maintenance. All rights reserved.</p>
      <a href="/privacy-policy.html">Privacy Policy</a>
    </div>
  </div>
</footer>
<script src="${jsPath}"></script>

</body>
</html>`;
}

function buildCtaBanner() {
  return `<section class="cta-banner">
  <div class="container">
    <h2>Ready to Get Started?</h2>
    <p>Contact us today for a free consultation and estimate. Call <a href="tel:${BUSINESS.phoneTel}" style="color:white;text-decoration:underline;">${BUSINESS.phone}</a> or request a quote online.</p>
    <a href="/contact.html" class="btn btn--primary btn--lg">Get Your Free Quote</a>
  </div>
</section>
`;
}

// ============================================================
// 4. PAGE GENERATORS
// ============================================================

function generateLocationPage(city) {
  const depth = 1; // /locations/{city}.html
  const canonical = `locations/${city.slug}.html`;
  const title = `Lawn Care in ${city.name}, SC | ${BUSINESS.name}`;
  const description = `Professional lawn maintenance services in ${city.name}, SC. ${BUSINESS.name} offers mowing, fertilization, tree care, irrigation, garden beds & seasonal cleanup. Call ${BUSINESS.phone}.`;

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LandscapingBusiness',
    'name': `${BUSINESS.name} - ${city.name}, SC`,
    'telephone': BUSINESS.phoneTel,
    'email': BUSINESS.email,
    'url': `${BUSINESS.url}/${canonical}`,
    'foundingDate': BUSINESS.founded,
    'areaServed': {
      '@type': 'City',
      'name': city.name,
      'containedInPlace': { '@type': 'State', 'name': 'South Carolina' },
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Lawn Care Services',
      'itemListElement': SERVICES.map(svc => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': svc.name,
          'url': `${BUSINESS.url}/locations/${city.slug}/${svc.slug}.html`,
        },
      })),
    },
  }, null, 2);

  const extraHead = `  <script type="application/ld+json">
${schemaJson}
  </script>
`;

  const serviceCards = SERVICES.map(svc => `        <div class="service-card">
          <h3 class="service-card__title"><a href="/locations/${city.slug}/${svc.slug}.html" class="service-card__link">${svc.name}</a></h3>
          <p class="service-card__desc">${svc.intro} ${svc.cityContext(city)}</p>
          <a href="/locations/${city.slug}/${svc.slug}.html" class="service-card__link">Learn more &rarr;</a>
        </div>`).join('\n');

  const nearbyLinks = CITIES
    .filter(c => c.slug !== city.slug)
    .slice(0, 8)
    .map(c => `<a href="/locations/${c.slug}.html">${c.name}</a>`)
    .join(' &bull; ');

  const html = buildHead({ title, description, canonical, depth, extraHead })
    + buildHeader(depth)
    + `
<section class="page-hero">
  <div class="container">
    <h1>Lawn Care &amp; Maintenance in ${city.name}, SC</h1>
    <p class="page-hero__subtitle">Professional lawn care services for residential and commercial properties in ${city.name} and ${city.county}.</p>
  </div>
</section>

<section class="page-content">
  <div class="container" style="max-width:800px;">
    <p>${city.blurbs[0]}</p>
    <p>${city.blurbs[1]}</p>
    <p>${city.blurbs[2]}</p>
  </div>
</section>

<section class="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Services in <span class="text-green">${city.name}</span></h2>
      <p class="section-subtitle">Tap into the full range of lawn care services we offer to ${city.name} properties.</p>
    </div>
    <div class="services__grid">
${serviceCards}
    </div>
  </div>
</section>

${buildCtaBanner()}
<section class="page-content">
  <div class="container" style="max-width:800px;">
    <h2>Serving All of Upstate South Carolina</h2>
    <p>In addition to ${city.name}, Powerline Maintenance provides professional lawn care across the Upstate region. <a href="/service-areas.html">View all service areas</a>.</p>
    <p>${nearbyLinks}</p>
  </div>
</section>

`
    + buildFooter(depth);

  return html;
}

function generateCombinationPage(city, svc) {
  const depth = 2; // /locations/{city}/{service}.html
  const canonical = `locations/${city.slug}/${svc.slug}.html`;
  const title = `${svc.name} in ${city.name}, SC | ${BUSINESS.name}`;
  const description = `${svc.name} services in ${city.name}, SC from ${BUSINESS.name}. ${svc.intro} Serving ${city.county}. Call ${BUSINESS.phone} for a free estimate.`;

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `${svc.name} in ${city.name}, SC`,
    'description': `${svc.name} services for residential and commercial properties in ${city.name}, SC.`,
    'provider': {
      '@type': 'LandscapingBusiness',
      'name': BUSINESS.name,
      'telephone': BUSINESS.phoneTel,
      'email': BUSINESS.email,
      'url': BUSINESS.url,
    },
    'areaServed': {
      '@type': 'City',
      'name': city.name,
      'containedInPlace': { '@type': 'State', 'name': 'South Carolina' },
    },
    'serviceType': svc.name,
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
    },
  }, null, 2);

  const extraHead = `  <script type="application/ld+json">
${schemaJson}
  </script>
`;

  const includedList = svc.included.map(item => `      <li>${item}</li>`).join('\n');

  const otherServices = SERVICES
    .filter(s => s.slug !== svc.slug)
    .map(s => `<li><a href="/locations/${city.slug}/${s.slug}.html">${s.name} in ${city.name}</a></li>`)
    .join('\n        ');

  const otherCities = CITIES
    .filter(c => c.slug !== city.slug)
    .slice(0, 10)
    .map(c => `<a href="/locations/${c.slug}/${svc.slug}.html">${c.name}</a>`)
    .join(' &bull; ');

  const html = buildHead({ title, description, canonical, depth, extraHead })
    + buildHeader(depth)
    + `
<section class="page-hero">
  <div class="container">
    <h1>${svc.name} in ${city.name}, SC</h1>
    <p class="page-hero__subtitle">${svc.intro} ${svc.cityContext(city)}</p>
  </div>
</section>

<section class="page-content">
  <div class="container" style="max-width:800px;">
    <p>${svc.detail}</p>
    <p>${city.blurbs[0]}</p>

    <h2>What's Included</h2>
    <ul>
${includedList}
    </ul>

    <p>${city.blurbs[1]}</p>

    <h2>Why ${city.name} Chooses ${BUSINESS.name}</h2>
    <p>${city.blurbs[2]}</p>
    <p>For professional ${svc.name.toLowerCase()} in ${city.name}, call <a href="tel:${BUSINESS.phoneTel}">${BUSINESS.phone}</a> or <a href="/contact.html">request a free estimate online</a>. We look forward to serving you.</p>

    <h2>Other Services in ${city.name}</h2>
    <ul>
        ${otherServices}
    </ul>
    <p><a href="/locations/${city.slug}.html">&larr; All ${city.name} lawn care services</a></p>

    <h2>${svc.name} in Other Cities</h2>
    <p>${otherCities}</p>
    <p><a href="/service-areas.html">View all service areas</a></p>
  </div>
</section>

${buildCtaBanner()}`
    + buildFooter(depth);

  return html;
}

function generateServiceAreasHub() {
  const depth = 0; // /service-areas.html
  const canonical = 'service-areas.html';
  const title = `Service Areas | Upstate SC Lawn Care | ${BUSINESS.name}`;
  const description = `${BUSINESS.name} provides professional lawn care across 22 cities in Upstate South Carolina. Find your city and explore our services. Call ${BUSINESS.phone}.`;

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LandscapingBusiness',
    'name': BUSINESS.name,
    'telephone': BUSINESS.phoneTel,
    'email': BUSINESS.email,
    'url': BUSINESS.url,
    'areaServed': CITIES.map(c => ({
      '@type': 'City',
      'name': c.name,
      'containedInPlace': { '@type': 'State', 'name': 'South Carolina' },
    })),
  }, null, 2);

  const extraHead = `  <script type="application/ld+json">
${schemaJson}
  </script>
`;

  const cityCards = CITIES.map(city => {
    const serviceLinks = SERVICES.map(svc =>
      `<li><a href="/locations/${city.slug}/${svc.slug}.html">${svc.name}</a></li>`
    ).join('\n            ');
    return `        <div class="service-card">
          <h3 class="service-card__title"><a href="/locations/${city.slug}.html">${city.name}, SC</a></h3>
          <p class="service-card__desc">${city.county}</p>
          <ul style="list-style:none;padding:0;margin:8px 0 0 0;font-size:0.9rem;">
            ${serviceLinks}
          </ul>
          <a href="/locations/${city.slug}.html" class="service-card__link" style="margin-top:12px;display:inline-block;">View all ${city.name} services &rarr;</a>
        </div>`;
  }).join('\n');

  const html = buildHead({ title, description, canonical, depth, extraHead })
    + buildHeader(depth)
    + `
<section class="page-hero">
  <div class="container">
    <h1>Service Areas &mdash; Upstate South Carolina</h1>
    <p class="page-hero__subtitle">${BUSINESS.name} provides professional lawn care across 22 cities in Upstate SC. Find your city below.</p>
  </div>
</section>

<section class="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Cities We <span class="text-green">Serve</span></h2>
      <p class="section-subtitle">Click on your city to view available services and request a free estimate.</p>
    </div>
    <div class="services__grid">
${cityCards}
    </div>
  </div>
</section>

${buildCtaBanner()}`
    + buildFooter(depth);

  return html;
}

function generateSitemap(urls) {
  const entries = urls.map(u => {
    return `  <url>
    <loc>${BUSINESS.url}/${u.path}</loc>
    <changefreq>${u.changefreq || 'monthly'}</changefreq>
    <priority>${u.priority || '0.6'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

// ============================================================
// 5. EXISTING FILE UPDATERS
// ============================================================

function updateFooterInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [SKIP] ${filePath} not found`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Add "Service Areas" link to footer Quick Links if not already present
  if (content.includes('/service-areas.html')) {
    console.log(`  [SKIP] ${filePath} already has service-areas link`);
    return;
  }

  // Strategy: find the Quick Links section and add our link before Privacy Policy
  // Look for the privacy-policy link in the Quick Links section of the footer
  const privacyLinkPattern = /<li><a href="\/privacy-policy\.html">Privacy Policy<\/a><\/li>/;
  if (privacyLinkPattern.test(content)) {
    content = content.replace(
      privacyLinkPattern,
      '<li><a href="/service-areas.html">Service Areas</a></li>\n        <li><a href="/privacy-policy.html">Privacy Policy</a></li>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  [UPDATED] ${filePath} — added Service Areas to footer`);
  } else {
    console.log(`  [SKIP] ${filePath} — could not find footer injection point`);
  }
}

function updateServicePage(filePath, svc) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [SKIP] ${filePath} not found`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // First update the footer
  if (!content.includes('/service-areas.html')) {
    const privacyLinkPattern = /<li><a href="\/privacy-policy\.html">Privacy Policy<\/a><\/li>/;
    if (privacyLinkPattern.test(content)) {
      content = content.replace(
        privacyLinkPattern,
        '<li><a href="/service-areas.html">Service Areas</a></li>\n        <li><a href="/privacy-policy.html">Privacy Policy</a></li>'
      );
    }
  }

  // Now add city links section before the CTA banner (if not already present)
  if (content.includes('service-areas-cities')) {
    console.log(`  [SKIP] ${filePath} already has city links section`);
    fs.writeFileSync(filePath, content, 'utf8');
    return;
  }

  const cityLinks = CITIES.map(city =>
    `<li><a href="/locations/${city.slug}/${svc.slug}.html">${svc.name} in ${city.name}</a></li>`
  ).join('\n          ');

  const citySection = `
<section class="page-content" id="service-areas-cities">
  <div class="container" style="max-width:800px;">
    <h2>${svc.name} Service Areas</h2>
    <p>We provide professional ${svc.name.toLowerCase()} services across Upstate South Carolina. Select your city to learn more:</p>
    <ul>
          ${cityLinks}
    </ul>
    <p><a href="/service-areas.html">View all service areas &rarr;</a></p>
  </div>
</section>

`;

  // Insert before the CTA banner
  const ctaPattern = /<section class="cta-banner">/;
  if (ctaPattern.test(content)) {
    content = content.replace(ctaPattern, citySection + '<section class="cta-banner">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  [UPDATED] ${filePath} — added city links + footer link`);
  } else {
    // fallback: insert before footer
    const footerPattern = /<footer class="footer">/;
    if (footerPattern.test(content)) {
      content = content.replace(footerPattern, citySection + '<footer class="footer">');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  [UPDATED] ${filePath} — added city links before footer + footer link`);
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  [PARTIAL] ${filePath} — footer updated but could not insert city links`);
    }
  }
}

// ============================================================
// 6. MAIN EXECUTION
// ============================================================

function main() {
  const ROOT = __dirname;
  const locationsDir = path.join(ROOT, 'locations');
  const allUrls = [];

  console.log('=== Powerline Maintenance SEO Page Generator ===\n');

  // --- Existing pages for sitemap ---
  allUrls.push({ path: '', changefreq: 'weekly', priority: '1.0' });
  allUrls.push({ path: 'about.html', changefreq: 'monthly', priority: '0.8' });
  allUrls.push({ path: 'contact.html', changefreq: 'monthly', priority: '0.9' });
  allUrls.push({ path: 'landing.html', changefreq: 'monthly', priority: '0.7' });
  allUrls.push({ path: 'privacy-policy.html', changefreq: 'yearly', priority: '0.3' });
  SERVICES.forEach(svc => {
    allUrls.push({ path: `services/${svc.slug}.html`, changefreq: 'monthly', priority: '0.8' });
  });

  // --- Service areas hub ---
  console.log('[1/5] Generating service-areas.html');
  const hubHtml = generateServiceAreasHub();
  fs.writeFileSync(path.join(ROOT, 'service-areas.html'), hubHtml, 'utf8');
  allUrls.push({ path: 'service-areas.html', changefreq: 'weekly', priority: '0.9' });
  console.log('  Done.\n');

  // --- Location pages ---
  console.log('[2/5] Generating location pages and combo pages');
  ensureDir(locationsDir);
  let locationCount = 0;
  let comboCount = 0;

  CITIES.forEach(city => {
    // City hub page
    const cityDir = path.join(locationsDir, city.slug);
    ensureDir(cityDir);

    const locationHtml = generateLocationPage(city);
    fs.writeFileSync(path.join(locationsDir, `${city.slug}.html`), locationHtml, 'utf8');
    allUrls.push({ path: `locations/${city.slug}.html`, changefreq: 'monthly', priority: '0.7' });
    locationCount++;

    // Combo pages
    SERVICES.forEach(svc => {
      const comboHtml = generateCombinationPage(city, svc);
      fs.writeFileSync(path.join(cityDir, `${svc.slug}.html`), comboHtml, 'utf8');
      allUrls.push({ path: `locations/${city.slug}/${svc.slug}.html`, changefreq: 'monthly', priority: '0.6' });
      comboCount++;
    });
  });
  console.log(`  ${locationCount} location pages created.`);
  console.log(`  ${comboCount} combination pages created.\n`);

  // --- Update existing files ---
  console.log('[3/5] Updating footers on existing pages');
  const rootPages = ['index.html', 'about.html', 'contact.html', 'landing.html'];
  rootPages.forEach(page => {
    updateFooterInFile(path.join(ROOT, page));
  });
  console.log('');

  console.log('[4/5] Updating service pages with city links');
  SERVICES.forEach(svc => {
    updateServicePage(path.join(ROOT, 'services', `${svc.slug}.html`), svc);
  });
  console.log('');

  // --- Sitemap ---
  console.log('[5/5] Generating sitemap.xml');
  const sitemapXml = generateSitemap(allUrls);
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`  ${allUrls.length} URLs in sitemap.\n`);

  console.log('=== Generation complete! ===');
  console.log(`Total new files: ${1 + locationCount + comboCount} (1 hub + ${locationCount} locations + ${comboCount} combos)`);
  console.log(`Sitemap URLs: ${allUrls.length}`);
}

main();
