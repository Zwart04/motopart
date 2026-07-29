const BIKE_DATA={
honda:{
  name:'Honda',types:['bebek','matic','sport'],
  models:{
    bebek:[
      {id:'honda-supra-x-125',name:'Supra X 125',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'Rantai + Gir',km:25000,day:730},{name:'Kampas Depan',km:20000,day:365},
          {name:'Kampas Belakang',km:25000,day:365},{name:'Ban Depan',km:30000,day:1095},
          {name:'Ban Belakang',km:25000,day:1095},{name:'Aki',km:0,day:730},
          {name:'Filter Oli',km:8000,day:180},{name:'Minyak Rem',km:0,day:730},
          {name:'Setel Klep',km:8000,day:365}
        ]},
      {id:'honda-supra-gtr-150',name:'Supra GTR 150',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:300},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Aki',km:0,day:730},
          {name:'Filter Oli',km:8000,day:180},{name:'Minyak Rem',km:0,day:730},
          {name:'Air Radiator',km:24000,day:730}
        ]},
      {id:'honda-revo-110',name:'Revo 110',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'Rantai + Gir',km:25000,day:730},{name:'Kampas Depan',km:20000,day:365},
          {name:'Kampas Belakang',km:25000,day:365},{name:'Ban Depan',km:30000,day:1095},
          {name:'Ban Belakang',km:25000,day:1095},{name:'Aki',km:0,day:730},
          {name:'Minyak Rem',km:0,day:730},{name:'Setel Klep',km:8000,day:365}
        ]}
    ],
    matic:[
      {id:'honda-beat',name:'Beat eSP',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Minyak Rem',km:0,day:730}
        ]},
      {id:'honda-vario-125',name:'Vario 125',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730}
        ]},
      {id:'honda-vario-150',name:'Vario 150/160',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:300},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:24000,day:730}
        ]},
      {id:'honda-pcx',name:'PCX 150/160',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:300},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:24000,day:730}
        ]},
      {id:'honda-scoopy',name:'Scoopy',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Minyak Rem',km:0,day:730}
        ]},
      {id:'honda-stylo-160',name:'Stylo 160',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:300},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:24000,day:730}
        ]},
      {id:'honda-genio',name:'Genio',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:8000,day:180},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730}
        ]}
    ],
    sport:[
      {id:'honda-cbr150',name:'CBR 150R',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:8000,day:180},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:15000,day:300},{name:'Kampas Belakang',km:20000,day:365},
          {name:'Ban Depan',km:20000,day:1095},{name:'Ban Belakang',km:15000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:24000,day:730},
          {name:'Setel Klep',km:24000,day:730}
        ]},
      {id:'honda-cbr250',name:'CBR 250RR',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:8000,day:180},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:18000,day:365},
          {name:'Ban Depan',km:15000,day:1095},{name:'Ban Belakang',km:15000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:24000,day:730}
        ]},
      {id:'honda-cb150r',name:'CB 150R',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:8000,day:180},{name:'Rantai + Gir',km:25000,day:730},
          {name:'Kampas Depan',km:15000,day:365},{name:'Kampas Belakang',km:20000,day:365},
          {name:'Ban Depan',km:25000,day:1095},{name:'Ban Belakang',km:20000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:24000,day:730}
        ]},
      {id:'honda-crf150',name:'CRF 150L',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:8000,day:120},{name:'Rantai + Gir',km:15000,day:365},
          {name:'Kampas Depan',km:10000,day:180},{name:'Kampas Belakang',km:15000,day:365},
          {name:'Ban Depan',km:12000,day:730},{name:'Ban Belakang',km:10000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:365},{name:'Air Radiator',km:24000,day:730},
          {name:'Setel Klep',km:8000,day:365}
        ]}
    ]
  }
},
yamaha:{
  name:'Yamaha',types:['matic','bebek','sport'],
  models:{
    matic:[
      {id:'yamaha-nmax',name:'NMax 155',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Oli Gardan',km:10000,day:365},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:300},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365}
        ]},
      {id:'yamaha-aerox',name:'Aerox 155',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:270},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:12000,day:270},
          {name:'Kampas Belakang',km:18000,day:365},{name:'Ban Depan',km:20000,day:1095},
          {name:'Ban Belakang',km:15000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365}
        ]},
      {id:'yamaha-lexi',name:'Lexi 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:270},
          {name:'Busi',km:6000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Minyak Rem',km:0,day:730}
        ]},
      {id:'yamaha-mio',name:'Mio M3 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:365},
          {name:'Busi',km:6000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730}
        ]},
      {id:'yamaha-xmax',name:'XMax 250',
        parts:[
          {name:'Oli Mesin',km:5000,day:180},{name:'Oli Gardan',km:10000,day:365},
          {name:'Busi',km:10000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:12000,day:270},
          {name:'Kampas Belakang',km:15000,day:300},{name:'Ban Depan',km:20000,day:1095},
          {name:'Ban Belakang',km:15000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365}
        ]},
      {id:'yamaha-fazzio',name:'Fazzio 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:365},
          {name:'Busi',km:6000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Minyak Rem',km:0,day:730}
        ]},
      {id:'yamaha-grand-filano',name:'Grand Filano 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:365},
          {name:'Busi',km:6000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730},{name:'Minyak Rem',km:0,day:730}
        ]},
      {id:'yamaha-freego',name:'FreeGo 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:365},
          {name:'Busi',km:6000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:24000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:24000,day:730},
          {name:'Aki',km:0,day:730}
        ]}
    ],
    bebek:[
      {id:'yamaha-jupiter-z1',name:'Jupiter Z1',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Aki',km:0,day:730},
          {name:'Minyak Rem',km:0,day:730},{name:'Setel Klep',km:10000,day:365}
        ]},
      {id:'yamaha-vega-rr',name:'Vega RR',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},
          {name:'Busi',km:8000,day:180},{name:'Filter Udara',km:12000,day:365},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Aki',km:0,day:730}
        ]}
    ],
    sport:[
      {id:'yamaha-r15',name:'R15 V4',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:18000,day:365},
          {name:'Ban Depan',km:20000,day:1095},{name:'Ban Belakang',km:15000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365},
          {name:'Setel Klep',km:20000,day:730}
        ]},
      {id:'yamaha-r25',name:'R25 / R3',
        parts:[
          {name:'Oli Mesin',km:5000,day:90},{name:'Busi',km:10000,day:365},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:15000,day:300},
          {name:'Ban Depan',km:15000,day:1095},{name:'Ban Belakang',km:12000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365},
          {name:'Setel Klep',km:24000,day:730}
        ]},
      {id:'yamaha-mt15',name:'MT-15',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:18000,day:365},
          {name:'Ban Depan',km:20000,day:1095},{name:'Ban Belakang',km:15000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365},
          {name:'Setel Klep',km:20000,day:730}
        ]},
      {id:'yamaha-xsr155',name:'XSR 155',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Busi',km:8000,day:180},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:15000,day:300},{name:'Kampas Belakang',km:20000,day:365},
          {name:'Ban Depan',km:20000,day:1095},{name:'Ban Belakang',km:15000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:10000,day:365},
          {name:'Minyak Rem',km:0,day:730}
        ]}
    ]
  }
},
suzuki:{
  name:'Suzuki',types:['matic','bebek','sport'],
  models:{
    matic:[
      {id:'suzuki-address',name:'Address 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:270},
          {name:'Busi',km:8000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:15000,day:540},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:15000,day:540},
          {name:'Aki',km:0,day:540},{name:'Filter Oli',km:12000,day:365}
        ]},
      {id:'suzuki-nex',name:'Nex II',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:270},
          {name:'Busi',km:8000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'V-Belt / CVT',km:15000,day:540},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:15000,day:540},
          {name:'Aki',km:0,day:540}
        ]},
      {id:'suzuki-burgman',name:'Burgman 125',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Oli Gardan',km:8000,day:270},
          {name:'Busi',km:8000,day:365},{name:'Filter Udara',km:8000,day:180},
          {name:'V-Belt / CVT',km:15000,day:540},{name:'Kampas Depan',km:12000,day:300},
          {name:'Kampas Belakang',km:18000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Roller CVT',km:15000,day:540},
          {name:'Aki',km:0,day:730},{name:'Minyak Rem',km:0,day:730},
          {name:'Filter Oli',km:12000,day:365}
        ]}
    ],
    bebek:[
      {id:'suzuki-satria-f150',name:'Satria F150',
        parts:[
          {name:'Oli Mesin',km:2500,day:90},
          {name:'Busi',km:8000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:300},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Aki',km:0,day:540},
          {name:'Filter Oli',km:7500,day:270},{name:'Minyak Rem',km:0,day:730}
        ]}
    ],
    sport:[
      {id:'suzuki-gsx150',name:'GSX R150',
        parts:[
          {name:'Oli Mesin',km:4000,day:90},{name:'Busi',km:8000,day:365},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:18000,day:365},
          {name:'Ban Depan',km:20000,day:1095},{name:'Ban Belakang',km:15000,day:1095},
          {name:'Aki',km:0,day:540},{name:'Filter Oli',km:8000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:10000,day:365}
        ]}
    ]
  }
},
kawasaki:{
  name:'Kawasaki',types:['bebek','sport'],
  models:{
    bebek:[
      {id:'kawasaki-kaze',name:'Kaze ZX130',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},
          {name:'Busi',km:10000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Aki',km:0,day:540},
          {name:'Filter Oli',km:9000,day:270}
        ]}
    ],
    sport:[
      {id:'kawasaki-ninja250',name:'Ninja 250',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Busi',km:12000,day:365},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:18000,day:365},
          {name:'Ban Depan',km:15000,day:1095},{name:'Ban Belakang',km:12000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:6000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:12000,day:365}
        ]},
      {id:'kawasaki-ninja150',name:'Ninja 150 RR',
        parts:[
          {name:'Oli Mesin',km:2000,day:60},{name:'Oli Samping',km:0,day:0},
          {name:'Busi',km:8000,day:240},{name:'Filter Udara',km:8000,day:240},
          {name:'Rantai + Gir',km:15000,day:365},{name:'Kampas Depan',km:12000,day:270},
          {name:'Kampas Belakang',km:18000,day:365},{name:'Ban Depan',km:20000,day:1095},
          {name:'Ban Belakang',km:15000,day:1095},{name:'Aki',km:0,day:365},
          {name:'Minyak Rem',km:0,day:365}
        ]},
      {id:'kawasaki-w175',name:'W175',
        parts:[
          {name:'Oli Mesin',km:6000,day:180},
          {name:'Busi',km:12000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:25000,day:1095},
          {name:'Ban Belakang',km:20000,day:1095},{name:'Aki',km:0,day:730},
          {name:'Filter Oli',km:12000,day:365}
        ]},
      {id:'kawasaki-klx150',name:'KLX 150',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Busi',km:8000,day:240},
          {name:'Filter Udara',km:6000,day:120},{name:'Rantai + Gir',km:15000,day:365},
          {name:'Kampas Depan',km:10000,day:180},{name:'Kampas Belakang',km:12000,day:300},
          {name:'Ban Depan',km:12000,day:730},{name:'Ban Belakang',km:10000,day:730},
          {name:'Aki',km:0,day:540},{name:'Filter Oli',km:10000,day:270},
          {name:'Minyak Rem',km:0,day:365}
        ]},
      {id:'kawasaki-z25',name:'Z250 / Z25',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},{name:'Busi',km:12000,day:365},
          {name:'Filter Udara',km:12000,day:365},{name:'Rantai + Gir',km:20000,day:730},
          {name:'Kampas Depan',km:12000,day:270},{name:'Kampas Belakang',km:18000,day:365},
          {name:'Ban Depan',km:15000,day:1095},{name:'Ban Belakang',km:12000,day:1095},
          {name:'Aki',km:0,day:730},{name:'Filter Oli',km:6000,day:180},
          {name:'Minyak Rem',km:0,day:730},{name:'Air Radiator',km:12000,day:365}
        ]},
      {id:'kawasaki-eliminator',name:'Eliminator 150',
        parts:[
          {name:'Oli Mesin',km:3000,day:90},
          {name:'Busi',km:10000,day:365},{name:'Filter Udara',km:12000,day:365},
          {name:'Rantai + Gir',km:20000,day:730},{name:'Kampas Depan',km:15000,day:365},
          {name:'Kampas Belakang',km:20000,day:365},{name:'Ban Depan',km:20000,day:1095},
          {name:'Ban Belakang',km:15000,day:1095},{name:'Aki',km:0,day:540},
          {name:'Filter Oli',km:9000,day:270}
        ]}
    ]
  }
}};