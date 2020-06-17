<template xmlns:a-clo="http://www.w3.org/1999/html">
	<div id="app">
		<a-layout>
			<header style="height: 80px;background-color: cornflowerblue">
				<a-row type="flex" justify="center" align="middle">
					<a-col :span="20">
						<div id="log" style="width: 100px;height: 50px;background-color: red"></div>
					</a-col>
					<a-col :span="1" :offset="0">
						<a-icon type="search"/>
					</a-col>
					<a-col :span="1">
						
						<a-icon type="bell"/>
					</a-col>
					
					<a-col :span="1">
						
						<a-icon type="github"/>
						用户名
					</a-col>
				
				</a-row>
			
			</header>
			<a-layout-content>
				<!--编译器上方说明-->
				<div id='top' style="width: 100%;height: 80px;background-color: white">
					<h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, provident.</h1>
				</div>
				<!--选择1-->
				<div id='editor1' style="width: 100%">
					<a-row type="flex" justify="space-around" align="middle">
						<a-col :span="1">
							<div class="type-select">
								<a-select name="selected" v-model="selected" @change="getTypeSelected">
									<a-select-option :value="types.name" v-for="types in typeList">{{types.name}}
									</a-select-option>
								</a-select>
							</div>
						</a-col>
						<a-col :span="18">
							<h2>Monaco Editor Auto-completion test for <code>{{getTypeSelected()}}</code> files</h2>
						</a-col>
						<a-col :span="1">
							<a-button v-on:click="wrap1()">提交</a-button>
						</a-col>
						<a-col :span="23">
							<div id="container"></div>
						</a-col>
					</a-row>
					<!--编译器-->
				</div>
			
			</a-layout-content>
			<!--中间间隔-->
			<a-layout-content>
				<div style=" height: 100px"></div>
			</a-layout-content>
			<!--下方编译器-->
			<a-layout-content>
				<div id='editor2'>
					<a-row type="flex" justify="space-around" align="middle">
						<a-col :span="1">
							<div class="type-select">
								<a-select name="selected" v-model="selected" @change="getTypeSelected">
									<a-select-option :value="types.name" v-for="types in typeList">{{types.name}}
									</a-select-option>
								</a-select>
							</div>
						</a-col>
						<a-col :span="18">
							<h2>Monaco Editor Auto-completion test for <code>{{getTypeSelected()}}</code> files</h2>
						</a-col>
						<a-col :span="1">
							<a-button v-on:click="wrap2()">提交</a-button>
						</a-col>
						<a-col :span="23">
							<div id="container2"></div>
						</a-col>
					</a-row>
					<!--编译器-->
				</div>
			</a-layout-content>
			<a-layout-content>
				<a-col :span="24" :offset="22">
					<a-button style="background-color: #66ec66" v-on:click="wrap3()">提交全部</a-button>
				</a-col>
			</a-layout-content>
			
			<a-layout-footer style="text-align: center;margin-top: 50px">
				Ant Design ©2018 Created by Ant UED
			</a-layout-footer>
		
		</a-layout>
	</div>
</template>
<script>
    // import MonacoEditor from "vue-monaco";
    import * as monaco from "monaco-editor";
    import AV from "leancloud-storage";


    export default {
        name: "app",
        mounted() {
            var language = this.getTypeSelected()
            monaco.languages.registerCompletionItemProvider(language, {

                // eslint-disable-next-line no-unused-vars
                provideCompletionItems: (model, position) => {
                    return [
                        {
                            label: "apiVersion",
                            kind: monaco.languages.CompletionItemKind.Function,
                            documentation: "Defines the version of Api to create the object",
                            detail: "Required Field"
                        }
                    ];
                }
            });
            // monaco.languages.registerSignatureHelpProvider(language, {
            // 	signatureHelpTriggerCharacters: ["(", ","],
            // 	// eslint-disable-next-line no-unused-vars
            // // 	provideSignatureHelp: (model, position, token) => {
            // // 		return {
            // // 			activeParameter: 0,
            // // 			activeSignature: 0,
            // // 			signatures: [
            // // 				{
            // // 					label:
            // // 						"string substr(string $string, int $start [, int $length])",
            // // 					parameters: [
            // // 						{
            // // 							label: "string $string",
            // // 							documentation:
            // // 								"The input string. Must be one character or longer."
            // // 						},
            // // 						{
            // // 							label: "int $start",
            // // 							documentation:
            // // 								"If $start is non-negative, the returned string will start at the $start'th position in string, counting from zero. For instance, in the string 'abcdef', the character at position 0 is 'a', the character at position 2 is 'c', and so forth.\r\nIf $start is negative, the returned string will start at the $start'th character from the end of string. If $string is less than $start characters long, FALSE will be returned."
            // // 						},
            // // 						{
            // // 							label: "int $length",
            // // 							documentation:
            // // 								"If $length is given and is positive, the string returned will contain at most $length characters beginning from $start (depending on the length of $string) If $length is given and is negative, then that many characters will be omitted from the end of $string (after the start position has been calculated when a start is negative). If $start denotes the position of this truncation or beyond, FALSE will be returned. If $length is given and is 0, FALSE or NULL, an empty string will be returned. If $length is omitted, the substring starting from $start until the end of the string will be returned."
            // // 						}
            // // 					]
            // // 				}
            // // 			]
            // // 		};
            // // 	}
            //  });
            AV.init({
                appId: "QWYHkkGNh8yN1nShCJvjKzRd-MdYXbMMI",
                appKey: "8w6hnkJ5oF1taia4aTvnUprV",
                masterKey: "byEev964NTc41rpuJxFQO4O1",
                serverURL: "https://api.alghub.com/"
            });

            var get_data = AV.Cloud.rpc('get_code', {
                "userId": "0008",
                'problem_id': 0,
            }, {remote: true}).then(function (data) {
                return data
            });
            var mo;
            
           async function aaa(){
               let  data=  await get_data.then( data =>data);
              
               return data;
            }
	        let data = aaa();
            console.log(data)
            mo = monaco.editor.create(document.getElementById("container"), {
                value: data[0],
                language: language,
                theme: "vs",
                fontSize: "13px",
                lineNumbers: "off",
                wordWrap: 'on', // 自动换行-->
                minimap: {
                    enabled: false // 关闭小地图-->
                },

            });
               console.log(123,mo)
            var mo2 = monaco.editor.create(document.getElementById("container2"), {
                value: "import pandats as pd\n" +
                    "class Data:\n" +
                    "   def getx(slef,features:List(Tuple[str,any])=>pd.DataFrame:",
                language: language,
                theme: "vs",
                fontSize: "13px",
                wordWrap: 'on', // 自动换行-->
                lineNumbers: "off",
                minimap: {
                    enabled: false // 关闭小地图-->
                },
            });


            this.edits2 = mo2
            // mo.onDidChangeCursorPosition(e => {
            // 	// console.log('Cursor changed', mo.getPosition());
            //
            //
            // });
            //
        },


        // 選單
        data() {
            return {
                typeList: [
                    {id: 1, name: 'python'},
                    {id: 2, name: 'javascript'},
                    {id: 3, name: 'c++'},
                ],
                selected: '',
                mo1: null,
                edits2: null,
                code: ''
            }
        }
        ,
        created() {
            //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
            this.selected = this.typeList[0].name;

        }
        ,
        methods: {
            getTypeSelected() {
                return this.selected
            },
            wrap1() {
                console.log('提交1')
                AV.init({
                    appId: "QWYHkkGNh8yN1nShCJvjKzRd-MdYXbMMI",
                    appKey: "8w6hnkJ5oF1taia4aTvnUprV",
                    masterKey: "byEev964NTc41rpuJxFQO4O1",
                    serverURL: "https://api.alghub.com/"
                });

                AV.Cloud.rpc('submit_code', {
                    "userId": "0002",
                    'problem_id': 0,
                    'req_type': 'user_code',
                    'code_text': document.getElementById("container").innerText
                }, {remote: true}).then(function (data) {
                    console.log(data)
                });
                
            },
            wrap2() {
                console.log('提交2')
                AV.init({
                    appId: "86qP86de9n4Uu38fsHTUPm6i-gzGzoHsz",
                    appKey: "JQTIH4Hprl1HcS3Nmlwhh5LU",
                    masterKey: "2nuyXlIYzehoAIDXTYpPJCSg",
                    serverURL: "https://api.alghub.com/"
                });


                AV.Cloud.rpc('submit_code', {
                    "userId": "0002",
                    'problem_id': 0,
                    'req_type': 'user_code',
                    'code_text': document.getElementById("container2").innerText
                }, {remote: true}).then(function (data) {
                    console.log(data)
                });
            },
            wrap3() {
                console.log('提交3')
                this.wrap1()
                this.wrap2()
            }


        },


    };

</script>

<style>
	body {
		margin: 0 auto;
		touch-action: none;
		
	}
	
	#container {
		
		height: 20rem;
		display: grid;
		justify-items: center;
	}
	
	#container2 {
		height: 20rem;
		display: grid;
		justify-items: center;
		
	}
</style>
