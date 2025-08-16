# F*** THIS ROUTER.
#### I absoluteley loose it over my router not having logs, so I hack an old one.

Hello everyone! So where do we start? Being the tech person in my family I am generally in charge of the networking. For the longest time we were experiencing issues with connectivity across the entire house because of where the router was located.

Here is a basic layout plan I made in like two seconds:

![Floor plan](/blog_images/router_firmware/floorplan.jpg)

As you can see the router is not only in the most electromagnetically isolated place, but it is also as far away as possible from where most of our wireless devices are. The worst problems were for my brother, when he often couldn't even get through and entire Fortnite game, or roblox "experience" without loosing connection; I was the one who mostly heard the complaints. So we needed a solution. At some point, with my brand new shiny A+ certifaction I did one contract job, where I got lots of [CAT 6 cabling](/blog/toomuchcabling), along with an assorment of networking tools. The original idea was to route the house with ethernet. Sadly, I never got around to it. The fear of messing up the walls, and the size of the task meant I kept putting it off. Thankfully though, the already had COAX. YIPPE. This means we can use MOCA. At first I was resistant to this ideas because it felt like a bandage, extra area for failure, and pricey. After the Wi-Fi was too slow for my family and my brother starting to bother the parents, something had to be done. So with and afternoon of time, brand new shiny moca adapters, and a hole in the wall we had ethernet upstairs! The connectivity issues were fixed, all was swell, until, of course, something stops working. Randomly the router would loose WLAN connection. At first I thought maybe I smooshed the coax cable, but there was really no way to tell. The adapters "MOCA" light was on so I really couldn't tell what was wrong. Of course, step one to trouble-shooting intermitent issues is to look at the logs. 

### The Rant 

Naturally most of would pnch `ifconfig` into a terminal and head over to the default gateway (For me this was `192.168.4.1`), only to be greeted with this monstrosity:

![The Monstrosity](/blog_images/router_firmware/floorplan.jpg)

Even after a Google Search, according to probably the most accurate source of information right now because of AI, Reddit, it wasn't possible to manage this router without using a mobile phone. This already had me seething; Then I couldn't find the logs section, only too again, from Reddit, find out there aren't any. After trying to blindly stuble around fixing this issue for a few days, I had enough. Now I am going to make my own router.
