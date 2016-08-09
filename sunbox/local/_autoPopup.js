nDelay = 290;//延迟毫秒数
//禁止自动弹出的(按钮)黑名单。CSS语法: #表示id  .表示class
blackIDs = ['#back-button', '#forward-button', '#FeiRuoNet_icon', '#SimpleMusicPlayer', '#QRCreator-icon', '#pocket-button', '#uAutoPagerize-icon', '#downloads-button', '#SimpleMail-toolbarbutton', '#aup-toolbarbutton', '#netvideohunter-toolbarbutton', '#lpt_lastpass-compact-btn', '#userChromebtnMenu', '#PanelUI-menu-button', '#anoBtn_Icon']; //'.bookmark-item',
//by xinggsf, 白名单，及触发动作
whiteIDs = [
{//放在omnibar中的搜索引擎图标
	id : 'omnibar-defaultEngine', //设定按钮ID
	popMenu : 'omnibar-engine-menu', //设定菜单ID
	run : btn => $('omnibar-in-urlbar').click()
},
{
	id : 'alertbox_tb_action',
	popMenu : 'alertbox_menu_panel',
},
];