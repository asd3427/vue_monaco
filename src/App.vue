<template>
	<div id="app">
		<div id="container">
			<div class="type-select">-->
				<select name="selected" id="" v-model="selected" @change="getTypeSelected">
					<option :value="types.name" v-for="types in typeList">{{types.name}}</option>
				</select>
			</div>
			<h2>Monaco Editor Auto-completion test for <code id='code'>{{getTypeSelected()}}</code> files</h2>
		</div>
	</div>
</template>
<script>
	// import MonacoEditor from "vue-monaco";
	import * as monaco from "monaco-editor";
	export default {
		name: "app",
		mounted() {
			var language = this.getTypeSelected()
			console.log(language)
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
			monaco.languages.registerSignatureHelpProvider(language, {
				signatureHelpTriggerCharacters: ["(", ","],
				// eslint-disable-next-line no-unused-vars
				provideSignatureHelp: (model, position, token) => {
					return {
						activeParameter: 0,
						activeSignature: 0,
						signatures: [
							{
								label:
									"string substr(string $string, int $start [, int $length])",
								parameters: [
									{
										label: "string $string",
										documentation:
											"The input string. Must be one character or longer."
									},
									{
										label: "int $start",
										documentation:
											"If $start is non-negative, the returned string will start at the $start'th position in string, counting from zero. For instance, in the string 'abcdef', the character at position 0 is 'a', the character at position 2 is 'c', and so forth.\r\nIf $start is negative, the returned string will start at the $start'th character from the end of string. If $string is less than $start characters long, FALSE will be returned."
									},
									{
										label: "int $length",
										documentation:
											"If $length is given and is positive, the string returned will contain at most $length characters beginning from $start (depending on the length of $string) If $length is given and is negative, then that many characters will be omitted from the end of $string (after the start position has been calculated when a start is negative). If $start denotes the position of this truncation or beyond, FALSE will be returned. If $length is given and is 0, FALSE or NULL, an empty string will be returned. If $length is omitted, the substring starting from $start until the end of the string will be returned."
									}
								]
							}
						]
					};
				}
			});
			
			monaco.editor.create(document.getElementById("container"), {
				value: "",
				language: language,
				theme: "vs-dark",
				fontSize: "25px"
			});
		},
		data() {
			return {
				typeList: [
					{id: 1, name: 'python'},
					{id: 2, name: 'javascript'},
					{id: 3, name: 'c++'},
				],
				selected: '',
				
			}
		},
		created() {
			//如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
			this.selected = this.typeList[0].name;
			
		},
		methods: {
			
			getTypeSelected() {
				return this.selected
			}
		},
		
	};

</script>

<style>
	#container {
		height: 30rem;
		width: 50rem;
		display: grid;
		justify-items: center;
		padding: 3rem;
	}
</style>

