<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Career
    |--------------------------------------------------------------------------
    */

    'career' => [
        [
            'employer' => 'The University of Oklahoma',
            'logo_path' => public_path('storage/logos/ou.png'),
            'title' => 'Software Engineer / Makerspace Support',
            'dates' => ['May 2016', 'Aug 2017'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Helped establish the first makerspace at the university while developing workflows and custom tooling for managing 3D printing services. Also helped develop O.V.A.L., a VR pedagogy tool currently used by universities nationwide. O.V.A.L. went on to host the world's first remote pedagogy session in virtual reality
            MD,
        ],
        [
            'employer' => 'TankVault',
            'logo_path' => public_path('storage/logos/tankvault.png'),
            'title' => 'Software Engineering Intern',
            'dates' => ['Aug 2016', 'Nov 2016'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Developed web-based tooling to streamline oil and gas worker operations. Features developed included mapping applications used for route optimization, forecast indicators for field workers, as well as mobile alerts and monitoring for damaged oil production equipment
            MD,
        ],
        [
            'employer' => 'WellCaddie',
            'logo_path' => public_path('storage/logos/wellcaddie.png'),
            'title' => 'Software Engineer',
            'dates' => ['Nov 2016', 'May 2017'],
            'location' => 'Norman, OK',
            'content' => '',
        ],
        [
            'employer' => 'WellCaddie',
            'logo_path' => public_path('storage/logos/wellcaddie.png'),
            'title' => 'Senior Software Engineer',
            'dates' => ['May 2017', 'Jun 2018'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Implemented and facilitated a complete overhaul and refactor of all frontend and backend services of the WellCaddie platform. Directly resulted in a company valuation increase of several million dollars
            MD,
        ],
        [
            'employer' => 'The University of Oklahoma',
            'logo_path' => public_path('storage/logos/ou.png'),
            'title' => 'Pinyin Technology Consultant',
            'dates' => ['Aug 2017', 'May 2018'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Assisted in developing a number of patented transliteration devices to enable Chinese speakers to gain a better grasp of the English language through newly researched translation techniques
            MD,
        ],
        [
            'employer' => 'WellCaddie',
            'logo_path' => public_path('storage/logos/wellcaddie.png'),
            'title' => 'Lead Software Engineer',
            'dates' => ['Jun 2018', 'Jun 2021'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Oversaw software development initiatives for the entire company, including embedded hardware applications for IoT data collection
            MD,
        ],
        [
            'employer' => 'Wunderite',
            'logo_path' => public_path('storage/logos/wunderite.png'),
            'title' => 'Senior Software Engineer',
            'dates' => ['Jun 2021', 'Feb 2022'],
            'location' => 'Boston, MA',
            'content' => <<<MD
                Large-scale refactoring of a legacy codebase into a modern, performant architecture using Laravel, Vue.js, and TypeScript
            MD,
        ],
        [
            'employer' => 'Flywheel Digital',
            'logo_path' => public_path('storage/logos/flywheel.png'),
            'title' => 'Head of Walmart Retail',
            'dates' => ['Feb 2022', 'Present'],
            'location' => 'Rogers, AR',
            'content' => <<<MD
                Leading the engineering initatives for the Walmart Retail column at one of the world's largest B2B eCommerce management services
            MD,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */

    'projects' => [
        [
            'title' => 'Stream',
            'description' => 'A video torrent streaming platform developed for XBMC / Kodi',
            'dates' => ['Jun 2014', 'May 2016'],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/stream',
            ],
        ],
        [
            'title' => 'Kore',
            'description' => '3D-printable assistive devices for those physically impaired',
            'dates' => ['Nov 2015', null],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/kore',
            ],
        ],
        [
            'title' => 'File.io',
            'description' => 'Decentralized file storage from a keychain computer',
            'dates' => ['Feb 2016', null],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/file.io',
            ],
        ],
        [
            'title' => 'stl-viewer',
            'description' => 'An online stereolithography file viewer using Three.js',
            'dates' => ['Feb 2016', null],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/stl-viewer',
            ],
        ],
        [
            'title' => 'O.V.A.L.',
            'description' => 'A VR pedagogy tool currently used by universities nationwide',
            'dates' => ['May 2016', 'Aug 2017'],
            'content' => <<<MD
                O.V.A.L. went on to host the world's first remote pedagogy session in virtual reality
            MD,
            'resources' => [
                'GitHub (Alpha)' => 'https://github.com/MorganWalkup/OVAL-Application',
                'GitHub (v1)' => 'https://github.com/OVAL-VR',
                'GitHub (v2)' => 'https://github.com/OULibraries/OVAL2.0',
                'Article' => 'https://campustechnology.com/articles/2017/10/09/multi-campus-vr-session-tours-remote-cave-art.aspx',
            ],
        ],
        [
            'title' => 'OctoFii',
            'description' => 'Receive OctoPrint notifications across a variety of platforms',
            'dates' => ['May 2016', null],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/octofii'
            ],
        ],
        [
            'title' => 'EmPy',
            'description' => 'Determine sentiment of Instagram posts using ML and Microsoft Cloud APIs',
            'dates' => ['Apr 2017', 'Mar 2018'],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/empy'
            ],
        ],
        [
            'title' => 'Athena',
            'description' => 'A mobile LMS platform targeting low-cost VR hardware',
            'dates' => ['Apr 2017', 'Mar 2018'],
            'content' => null,
            'resources' => [],
        ],
        [
            'title' => 'Seedling',
            'description' => 'A children\'s toy teaching PinYin to English transliteration',
            'dates' => ['Aug 2017', 'Oct 2017'],
            'content' => null,
            'resources' => [],
        ],
        [
            'title' => 'Let\'s Code',
            'description' => 'An elegant Express.js application to showcase your programming livestreams',
            'dates' => ['Jan 2019', null],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/lets-code',
            ],
        ],
        [
            'title' => 'tailwind-colors',
            'description' => 'A collection of Tailwind CSS color palettes 🎨 🖌',
            'dates' => ['Feb 2020', null],
            'content' => null,
            'resources' => [
                'GitHub' => 'https://github.com/brysonreece/tailwind-colors',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Community
    |--------------------------------------------------------------------------
    */

    'community' => [
        [
            'host' => 'The University of Oklahoma, Edge Makerspace',
            'logo_path' => public_path('storage/logos/ou.png'),
            'title' => 'Hacking Home Automation',
            'dates' => ['Feb 2016', null],
            'location' => 'Norman, OK',
            'content' => <<<MD
                #### A DIY Approach to Your Smart Home (2 sessions)
                Hosted a workshop that taught individuals how to combine off-the-shelf components, open source platforms, and a little hardware hackery to furnish a secure home automation platform on the cheap
            MD,
        ],
        [
            'host' => 'The University of Oklahoma, Edge Makerspace',
            'logo_path' => public_path('storage/logos/ou.png'),
            'title' => 'Introduction to 3D Printing',
            'dates' => ['Apr 2016', 'Dec 2016'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                #### 3D printing for the masses (36 sessions)
                Hosted a weekly workshop on developing 3D models and turning those creations into reality using next-generation 3D printers available to the facility
            MD,
        ],
        [
            'host' => 'The University of Oklahoma, Edge Makerspace',
            'logo_path' => public_path('storage/logos/ou.png'),
            'title' => 'VR @ OU',
            'dates' => ['Apr 2016', 'Dec 2016'],
            'location' => 'Norman, OK',
            'content' => <<<MD
                #### Virtual reality for the masses (8 sessions)
                Every week I introduced inexperienced community members to virtual reality; its applications, games, uses, and development workflows
            MD,
        ],
        [
            'host' => 'Techlahoma, OKC VR',
            'logo_path' => public_path('storage/logos/meetup.png'),
            'title' => 'Introduction to Unity',
            'dates' => ['Jul 2017', null],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Showcased the ease of development when creating applications or games using the Unity game engine. The audience determined a topic, baseball, and followed along as we developed a complimentary VR game in under an hour
            MD,
        ],
        [
            'host' => 'Techlahoma, OKC VR',
            'logo_path' => public_path('storage/logos/meetup.png'),
            'title' => 'Introduction to Unity (Advanced)',
            'dates' => ['Aug 2017', null],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Piggybacked off of a previous talk, continued to crowd-develop a rudimentary VR baseball game while showcasing patterns used when developing for augmented and virtual reality
            MD,
        ],
        [
            'host' => 'The University of Oklahoma, Homebrew Website Club',
            'logo_path' => public_path('storage/logos/ou.png'),
            'title' => 'Introduction to Laravel',
            'dates' => ['Oct 2018', null],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Demonstrated how to get started using the Laravel framework to flexibly develop web applications from scratch
            MD,
        ],
        [
            'host' => 'Norman AR/VR',
            'logo_path' => public_path('storage/logos/meetup.png'),
            'title' => 'Developing for the Microsoft HoloLens',
            'dates' => ['Sep 2018', null],
            'location' => 'Norman, OK',
            'content' => <<<MD
                Showcased the technologies used within the Microsoft HoloLens and how to get started creating applications for the platform
            MD,
        ],
        [
            'host' => 'Techlahoma, FreeCodeCamp OKC',
            'logo_path' => public_path('storage/logos/meetup.png'),
            'title' => 'Introduction to PHP',
            'dates' => ['Nov 2020', null],
            'location' => 'Norman, OK',
            'content' => <<<MD
                An interactive live-stream where individuals were able to ask questions and follow along as I introduced learners to the PHP language
            MD,
        ],
    ],

];
