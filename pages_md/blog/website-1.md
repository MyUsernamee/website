# Website Update - 2025-08-12
## First website deployment and update!

Hello everyone! Today I deployed and updated this website! This is actually the first NextJS and cloud run project I've ever done! So to kick this off I am going to go over what is new, how I made this website, and the things I learned!

## Whats new?

Let's start with whats new:

- Everything.

Lmao, I know this is kind of a blanket thing, but it's true. Technically everything is new because I just deployed the site! In all seriousness though, from the time I wrote the last blog post, heres what I've done.

- Worked on [contact](/contact) page.
- Make a Dockerfile, and dockerized the site.
- Fixed static generation of blog files.
- Started making the [DMQ](/daily_question)
- Put website in a Google Cloud Run
- Attached the run to my domain name.
- Made a dev branch.
- Fixed the favicon.

Overall pretty simple stuff and not much change front-end wise. The most interesting ones are the Dockerization, the static generation (mostly because of a funny story), and the Cloud Run.

## Website structure overview.

So this website at it's core is a NextJS website. Originally like I mentioned in the [about](/about) page, I was going to make this website with Flask, Python, and Tailwind because it was what I knew. I opted to use something I was unfamilliar with to broaden my horizons. In webdev now-a-days, you often hear about different frameworks, and how X framework is amazing and better then Y framework, etc... For this reason I always kind of kept away because it seemed like a lot of abstraction for almost no reason. From what I understood most websites were still made in J-Query anyways and it seemed to all of this extra bulk and headache for some features I really didn't care too much about. For example, I had used React before, and I didn't mind it. There were definetly some things to learn, but overall unless you were making a very reactive site, as the name implies, there wasn't much benifit for using it. With a site like this, I am not going to be updating it every like 0.2 seconds so it just didn't make sense. I also hear of other frameworks like Angular and Bootstrap, etc... One the stuck with me though was NextJS. Partly because I saw it used in a lot of different places but also because I heard it had static generation. 
As I mentioned I really didn't care all to much about reactivity, and this website was mostly going to be a glorified markdown renderer using pandoc. So really I just needed some sort of backend that would take my markdown, pandoc, and a html template then spit out a basic file. Even better if I cached it. So Flask sounded like a great fit. Of course, I want to learn something new and typescript / React was all the craze so I knew I needed something that would let me dip my toes and produce a website with almost no bulk, cause I am too broke to run a slow bloated web app. So NextJS ticked all those boxes. I got started by creating a next app by using the classic

```bash
$ npx create-next-app@latest
```

By rolling with the default options. I poked around the documentation a bit and with the help of node-pandoc, I got a pretty basic stie up and running pretty quickly. I did the basic layout and home-page, then I wrote the really simple md-html function that I use for every page. By this point, everything was about where I wanted it to be. The blog pages loaded the way I wanted. I had a blog list. Everything was great. I then want to put this on the cloud so I didn't have to host anything locally (even though I love doing this :( ), and I could learn something new. So I pushed the repo to github and got Google Cloud Run setup. I saw there was a Node.JS server option, but I also noticed there was a Dockerfile option. I love Docker, so of course I went with that. That also means that if I end up not liking Google Cloud down the line, it become much easier to move out. So after writing a quick docker file and trying to reduce any runtime cpu usage (which I made some mistakes of course), I got it up and running. Although I noticed the blog pages were taking a bit longer than expected. I did a build locally and saw something like this:

```
   ▲ Next.js 15.4.3

   Creating an optimized production build ...
 ✓ Compiled successfully in 2000ms
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
 ✓ Generating static pages (14/14)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                                 Size  First Load JS    
┌ ○ /                                      127 B         100 kB
├ ○ /_not-found                            994 B         101 kB
├ ƒ /[...slug]                             127 B         100 kB
└ ○ /blog                                  127 B         100 kB
+ First Load JS shared by all             100 kB
  ├ chunks/4bd1b696-cf72ae8a39fa05aa.js  54.3 kB
  ├ chunks/964-c3e49cf7341645bb.js       43.7 kB
  └ other shared chunks (total)          1.89 kB


○  (Static)  prerendered as static content
ƒ  (Dynamic)  Rendered dynamically (Or something like that) 
```

That isn't that exact message but you get the point. Slightly suboptimal. So I tried for like 2 days to figure out why. I used what I thought the documentation said to use, which I thought was `generateStaticPaths`. (The actual function name is `generateStaticParams`,  but I was confusing it with `getStaticPaths`). That lead me to believe that it was reserved for the pages router, so I spent ridiculous amount of time, more than I would like to admit, finding out that I just misspelled generateStaticParams. So after figuring that out, I got:

```
   ▲ Next.js 15.4.3

   Creating an optimized production build ...
 ✓ Compiled successfully in 0ms
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
 ✓ Generating static pages (14/14)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                                 Size  First Load JS    
┌ ○ /                                      127 B         100 kB
├ ○ /_not-found                            994 B         101 kB
├ ● /[...slug]                             127 B         100 kB
├   ├ /about.md
├   ├ /contact.md
├   ├ /daily_question.md
├   └ [+5 more paths]
└ ○ /blog                                  127 B         100 kB
+ First Load JS shared by all             100 kB
  ├ chunks/4bd1b696-cf72ae8a39fa05aa.js  54.3 kB
  ├ chunks/964-c3e49cf7341645bb.js       43.7 kB
  └ other shared chunks (total)          1.89 kB


○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

YIPPE! After that sent it Google Cloud Run and tried to setup my domain name. First I added the domain on Google Search console and bound it to the cloud run. It didn't work cause I needed to add some A records. I did that then it still didn't work, somehting about authentication. So I thought I had to make a load balancer, then it just started working lmao. I just had to wait. Then we are here YAY!
