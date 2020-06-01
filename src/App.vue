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
							<a-button v-on:click="wrap()">點我</a-button>
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
							<a-button v-on:click="wrap()">點我</a-button>
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
					<a-button style="background-color: #66ec66" v-on:click="wrap()">提交全部</a-button>
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
    import * as ant from 'ant-design-vue'
    import editor from "monaco-editor";
    import * as tf from '@tensorflow/tfjs'

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

            var mo = monaco.editor.create(document.getElementById("container"), {
                value: "",
                language: language,
                theme: "vs-dark",
                fontSize: "25px",
                wordWrap: 'on', // 自动换行-->
                minimap: {
                    enabled: false // 关闭小地图-->
                },
            });
            var mo2 = monaco.editor.create(document.getElementById("container2"), {
                value: "import pandats as pd\n" +
                    "class Data:\n" +
                    "   def getx(slef,features:List(Tuple[str,any])=>pd.DataFrame:",
                language: language,
                theme: "vs",
                fontSize: "13px",
                wordWrap: 'on', // 自动换行-->
                minimap: {
                    enabled: false // 关闭小地图-->
                },
            });

            this.edits = mo2
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
                edits: null,
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
            wrap() {
                // const shape = [2, 3]; // 2 行, 3 列
                // const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
                // a.print(); // 打印张量值
                console.log(this.edits.getValue())

            }
        }
        ,


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
