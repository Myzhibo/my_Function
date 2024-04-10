<template>  
  <div>
    多层级单选
    <el-dropdown trigger="click" style="width:30%">
      <el-button style="width:100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          {{Tag1}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <!-- 1级菜单 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(t0,i) in MYArr1">
          <el-dropdown trigger="hover" placement="right-start" :show-timeout="0">
            <span>{{t0[0]}}</span>
            <!-- 2级菜单 -->
            <el-dropdown-menu slot="dropdown" ref="subDropdown2">
              <el-dropdown-item v-for="(t1,i) in t0[1]">
                <el-dropdown trigger="hover" placement="right-start" :show-timeout="0">
                  <span>{{t1[0]}}</span>
                  <!-- 3级菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(t2,i) in t1[1]">
                      <span @click="handleClickTag1(t2, 'edit')">{{t2}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <br>
    <br>
    <br>
    <br>
    <br>

    多层级多选
    <el-dropdown trigger="click" style="width:30%" :hide-on-click="false">
      <el-button style="width:80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          {{Tag2.join(', ')}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(t,i) in MYArr2" style="position: relative;">
                <span style="position: absolute; right:5px; color:#999; font-size:10px ; ">></span>
          <el-dropdown trigger="hover" placement="right-start" :show-timeout="100" :hide-on-click="false" ref="subDropdown" >
            <!-- 1级菜单 -->
            <span>{{t[0]}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(t1,i) in MYArr2.filter(item => item[0] === t[0])[0][1]">
              <el-dropdown trigger="hover" :show-timeout="0" placement="right-start">
                <!-- 2级菜单 -->
                <span @click="handleClickTag2(t1, 'edit')"
                    :disabled="!Tag2.includes(t1) && (Tag2 ? [...new Set(Tag2.map(tag => MYArr2.find(group => group[1].includes(tag)) ? MYArr2.find(group => group[1].includes(tag))[0] : null).filter(tagName => tagName !== null))].includes(MYArr2.find(group => group[1].includes(t1)) ? MYArr2.find(group => group[1].includes(t1))[0] : null) : '')"
                >
                  {{t1}}  <i v-if="Tag2.includes(t1)" class="el-icon-check" style="margin-left:10px; margin-right:-10px;color:green" />
                </span>
              </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
  </div>
</template>  
  
<script>  
export default {  
  data() {  
    return {
      // 多层级【单】选data ↓↓↓↓↓↓↓↓↓↓↓
      Tag1: '',
      MYArr1:[
          [
              "七年级上册",
              [
                  [
                      "Starter Module 1 My teacher and my friends",
                      [
                          "Unit 1 Good morning，Miss Zhou.",
                          "Unit 2 Good morning. I'm Chen Zhong.",
                          "Unit 3 This is my friend."
                      ]
                  ],
                  [
                      "Starter Module 2 My English lesson",
                      [
                          "Unit 1 Open your book.",
                          "Unit 2 What's your number?",
                          "Unit 3 I'm twelve."
                      ]
                  ],
                  [
                      "Starter Module 3 My English book",
                      [
                          "Unit 1 What's this in English?",
                          "Unit 2 Can you help me, please?",
                          "Unit 3 What colour is it?"
                      ]
                  ],
                  [
                      "Starter Module 4 My everyday life",
                      [
                          "Unit 1 What day is it today?",
                          "Unit 2 What's the weather like?",
                          "Unit 3 What's your favourite sport?"
                      ]
                  ],
                  [
                      "Module 1 My classmates.",
                      [
                          "Unit 1 Nice to meet you.",
                          "Unit 2 I'm Wang Lingling and I'm thirteen years old.",
                          "Unit 3 Language in use"
                      ]
                  ],
                  [
                      "Module 2 My family",
                      [
                          "Unit 1 Is this your mum?",
                          "Unit 2 These are my parents.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 3 My school",
                      [
                          "Unit 1 There are thirty students in my class.",
                          "Unit 2 The library is on the left of the playground.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 4 Healthy food",
                      [
                          "Unit 1 We've got lots of apples.",
                          "Unit 2 Is your food and drink healthy?",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 5 My school day",
                      [
                          "Unit 1 I love history.",
                          "Unit 2 We start work at nine o'clock.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module A",
                      []
                  ],
                  [
                      "Module 6 A trip to the zoo",
                      [
                          "Unit 1 Does it eat meat?",
                          "Unit 2 The tiger lives in Asia.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 7 Computers",
                      [
                          "Unit 1 How do I write my homework on the computer?",
                          "Unit 2 When do you use a computer?",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 Choosing presents",
                      [
                          "Unit 1 I always like birthday parties.",
                          "Unit 2 She often goes to concerts.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 9 People and places",
                      [
                          "Unit 1 We're enjoying the school trip a lot.",
                          "Unit 2 They're waiting for buses or trains.",
                          "Unit 3 Language in use. "
                      ]
                  ],
                  [
                      "Module 10 Spring Festival",
                      [
                          "Unit 1 Are you getting ready for Spring Festival?",
                          "Unit 2 My mother's cleaning our house and sweeping away bad luck.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module B",
                      []
                  ]
              ]
          ],
          [
              "七年级下册",
              [
                  [
                      "Module 1 Lost and found",
                      [
                          "Unit 1 Whose bag is this?",
                          "Unit 2 Are they yours?",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 2 What can you do?",
                      [
                          "Unit 1 I can play the piano.",
                          "Unit 2 I can run really fast.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 3 Making plans",
                      [
                          "Unit 1 What are you going to do at the weekend?",
                          "Unit 2 We're going to cheer the players.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 4 Life in the future",
                      [
                          "Unit 1 Everyone will study at home.",
                          "Unit 2 Every family will have a small plane.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 5 Shopping",
                      [
                          "Unit 1 What can I do for you?",
                          "Unit 2 You can buy everything on the Internet.",
                          "Unit 3 Language in use. "
                      ]
                  ],
                  [
                      "Module 6 Around town",
                      [
                          "Unit 1 Could you tell me how to get to the National Stadium?",
                          "Unit 2 The London Eye is on your right.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module A",
                      []
                  ],
                  [
                      "Module 7 My past life",
                      [
                          "Unit 1 I was born in a small village.",
                          "Unit 2 I was born in Quincy.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 Story time",
                      [
                          "Unit 1 Once upon a time…",
                          "Unit 2 Goldilocks hurried out of the house.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 Story time",
                      [
                          "Unit 1 Once upon a time…",
                          "Unit 2 Goldilocks hurried out of the house.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 10 A holiday journey",
                      [
                          "Unit 1 What did you do?",
                          "Unit 2 This morning we took a walk.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 11 Body language",
                      [
                          "Unit 1 They touch noses!",
                          "Unit 2 Here are some ways to welcome them.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 12 Western music",
                      [
                          "Unit 1 It's so beautiful！",
                          "Unit 2 Vienna is the centre of European classical music.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module B",
                      []
                  ]
              ]
          ],
          [
              "八年级上册",
              [
                  [
                      "Module 1 How to learn English",
                      [
                          "Unit 1 Let's try to speak English as much as possible.",
                          "Unit 2 You should smile at her!",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 2 My home town and my country",
                      [
                          "Unit 1 It’s taller than many other buildings.",
                          "Unit 2 Cambridge is a beautiful city in the east of England.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 3 Sports",
                      [
                          "Unit 1 Nothing is more enjoyable than playing tennis.",
                          "Unit 2 This year we are training more carefully.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 4 Planes, ships and trains",
                      [
                          "Unit 1 He lives the farthest from school.",
                          "Unit 2 What is the best way to travel?",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 5 Lao She Teahouse",
                      [
                          "Unit 1 I wanted to see the Beijing Opera.",
                          "Unit 2 It describes the changes in Chinese society.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 6 Animals in danger",
                      [
                          "Unit 1 It allows people to get closer to them.",
                          "Unit 2 The WWF is working hard to save them all.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module A",
                      []
                  ],
                  [
                      "Module 7 A famous story",
                      [
                          "Unit 1 Alice was sitting with her sister by the river.",
                          "Unit 2 She was thinking about her cat.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 Accidents",
                      [
                          "Unit 1 While the lights were changing to red, a car suddenly appeared.",
                          "Unit 2 I was trying to pick it up when it bit me again.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 9 Population",
                      [
                          "Unit 1 The population of China is about 1.37 billion.",
                          "Unit 2 Arnwick was a city with 200,000 people.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 10 The weather",
                      [
                          "Unit 1 It might snow.",
                          "Unit 2 The weather is fine all year round.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 11 Way of life",
                      [
                          "Unit 1 In China, we open a gift later.",
                          "Unit 2 In England, you usually drink tea with milk.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 12 Help",
                      [
                          "Unit 1 What should we do before help arrives?",
                          "Unit 2 Stay away from windows and heavy furUniture.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module B",
                      []
                  ]
              ]
          ],
          [
              "八年级下册",
              [
                  [
                      "Module 1 Feelings and impressions",
                      [
                          "Unit 1 It smells delicious.",
                          "Unit 2 I feel nervous when I speak Chinese.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 2 Experiences",
                      [
                          "Unit 1 I've also entered lots of speaking competitions.",
                          "Unit 2 They have seen the Pyramids.",
                          "Unit 3 Language in use. "
                      ]
                  ],
                  [
                      "Module 3 Journey to space",
                      [
                          "Unit 1 Has it arrived yet?",
                          "Unit 2 We have not found life on any other planets yet.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 4 Seeing the doctor",
                      [
                          "Unit 1 I haven't done much exercise since I got my computer.",
                          "Unit 2 We have played football for a year now.",
                          "Unit 3 Language in use. "
                      ]
                  ],
                  [
                      "Module 5 Cartoons",
                      [
                          "Unit 1 It's time to watch a cartoon.",
                          "Unit 2 Tintin has been popular for over eighty years.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module A",
                      []
                  ],
                  [
                      "Module 6 Hobbies",
                      [
                          "Unit 1 Do you collect anything?",
                          "Unit 2 Hobbies can make you grow as a person.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 7 Summer in Los Angeles",
                      [
                          "Unit 1 Please write to me and send me some photos!",
                          "Unit 2 Fill out our form and come to learn English in Los Angeles!",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 Time off",
                      [
                          "Unit 1 I can hardly believe we're in the city centre.",
                          "Unit 2 We thought somebody was moving about.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 9 Friendship",
                      [
                          "Unit 1 Could I ask if you've mentioned this to her?",
                          "Unit 2 I believe that the world is what you think it is.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 10 On the radio",
                      [
                          "Unit 1 I hope that you can join us one day.",
                          "Unit 2 It seemed that they were speaking to me in person.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module B",
                      []
                  ]
              ]
          ],
          [
              "九年级上册",
              [
                  [
                      "Module 1 Wonders of the world",
                      [
                          "Unit 1 It's more than 2,000 years old.",
                          "Unit 2 The Grand Canyon was not just big.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 2 Public holidays",
                      [
                          "Unit 1 My family always go somewhere interesting as soon as the holiday begins.",
                          "Unit 2 We have celebrated the festival since the first pioneers arrived in America.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 3 Heroes",
                      [
                          "Unit 1 She trained hard，so she became a great player later.",
                          "Unit 2 There were few doctors，so he had to work very hard on his own.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 4 Home alone",
                      [
                          "Unit 1 I can look after myself，although it won't be easy for me.",
                          "Unit 2 I became so bored with their orders that I wished they would leave me alone. ",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 5 Museums",
                      [
                          "Unit 1 Don't cross that rope!",
                          "Unit 2 If you ever go to London，make sure you visit the Science Museum.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 6 Problems",
                      [
                          "Unit 1 If I start after dinner，I'll finish it before I go to bed.",
                          "Unit 2 If you tell him the truth now，you will show that you are honest.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module A",
                      []
                  ],
                  [
                      "Module 7 Great books",
                      [
                          "Unit 1 We're still influenced by Confucius's ideas.",
                          "Unit 2 It is still read and loved.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 Sports life",
                      [
                          "Unit 1 Daming wasn't chosen for the team last time.",
                          "Unit 2 He was invited to competitions around the world.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 9 Great inventions",
                      [
                          "Unit 1 Will computers be used more than books in the future?",
                          "Unit 2 Will books be replaced by the Internet?",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 10 Australia",
                      [
                          "Unit 1 I have some photos that I took in Australia last year.",
                          "Unit 2 The game that they like most is Australian football.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 11 Photos",
                      [
                          "Unit 1 He's the boy who won the photo competition last year!",
                          "Unit 2 The photo which we liked best was taken by Zhao Min.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 12 Save our world",
                      [
                          "Unit 1 If everyone starts to do something，the world will be saved.",
                          "Unit 2 Repeat these three words daily：reduce, reuse and recycle.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module B",
                      []
                  ]
              ]
          ],
          [
              "九年级下册",
              [
                  [
                      "Module 1 Travel",
                      [
                          "Unit 1 We toured the city by bus and by taxi.",
                          "Unit 2 It's a long story.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 2 Education",
                      [
                          "Unit 1 They don't sit in rows.",
                          "Unit 2 What do I like best about school?",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 3 Life now and then",
                      [
                          "Unit 1 They sometimes work harder.",
                          "Unit 2 I think life is better today.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 4 Rules and suggestions",
                      [
                          "Unit 1 You must be careful of falling stones.",
                          "Unit 2 We must keep the camp clean.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module A",
                      []
                  ],
                  [
                      "Module 5 Look after yourself",
                      [
                          "Unit 1 We'd better get you to hospital.",
                          "Unit 2 Get off the sofa!",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 6 Eating together",
                      [
                          "Unit 1 When is the school-leavers' party?",
                          "Unit 2 Knives and forks are used for most Western food.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 7 English for you and me",
                      [
                          "Unit 1 Have you ever been to an English corner?",
                          "Unit 2 We all own English.",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Module 8 My future life",
                      [
                          "Unit 1 Here's to our friendship !",
                          "Unit 2 I know that you will be better at maths. ",
                          "Unit 3 Language in use."
                      ]
                  ],
                  [
                      "Revision module B",
                      []
                  ]
              ]
          ]
        ],


        
      // 多层级【单】选data ↓↓↓↓↓↓↓↓↓↓↓
      Tag2: [],
      MYArr2: [
          [
              "生活与学习",
              [
                  "校园生活",
                  "身心健康",
                  "励志故事",
                  "乐学善学",
                  "教育育人"
              ]
          ],
          [
              "做人与做事",
              [
                  "职业启蒙",
                  "劳动教育",
                  "金融理财",
                  "实践创新"
              ]
          ],
          [
              "社会与服务",
              [
                  "志愿服务",
                  "家乡变化"
              ]
          ],
          [
              "人际交往与沟通",
              [
                  "友谊故事",
                  "亲情故事",
                  "团队协作",
                  "文化交际"
              ]
          ],
          [
              "文学体育与艺术",
              [
                  "艺术作品",
                  "艺术人物",
                  "体育活动"
              ]
          ],
          [
              "历史文化与社会",
              [
                  "文化习俗",
                  "杰出人物",
                  "公共秩序",
                  "中国实力与美",
                  "社会热点"
              ]
          ],
          [
              "科学与技术",
              [
                  "科技工程",
                  "发明创新"
              ]
          ],
          [
              "人与自然",
              [
                  "自然生态",
                  "环境保护",
                  "灾害防范",
                  "宇宙探索",
                  "旅游风光"
              ]
            ],
        ]
          
      
      
    };  
  },
  mounted() {
    console.log('多层级【单】选data ↓↓↓↓↓↓↓↓↓↓↓');
    console.log(this.MYArr1);

    
    console.log('多层级【多】选data ↓↓↓↓↓↓↓↓↓↓↓');
    console.log(this.MYArr2);
  },
  methods: {
    // 多层级单选data ↓↓↓↓↓↓↓↓↓↓↓
    handleClickTag1(t) {
      this.Tag1 = t
    },

    // 多层级多选data ↓↓↓↓↓↓↓↓↓↓↓
    handleClickTag2(t){
      // 当前已经选中第二层级某一个之后就不能再选了
      const isDisabled = !this.Tag2.includes(t) && 
                         (this.Tag2 ? [...new Set(this.Tag2.map(tag => this.MYArr2.find(group => group[1].includes(tag)) ? this.MYArr2.find(group => group[1].includes(tag))[0] : null).filter(tagName => tagName !== null))].includes(this.MYArr2.find(group => group[1].includes(t)) ? this.MYArr2.find(group => group[1].includes(t))[0] : null) : '')

      if(isDisabled){
        return false;
      }
      if(!this.Tag2.includes(t)) this.Tag2.push(t);
      else this.Tag2.splice(this.Tag2.indexOf(t), 1);
    }
  },  
};  
</script>