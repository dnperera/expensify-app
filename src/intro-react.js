console.log('App.js is running');
//JSX
const app ={
	title:'In Decision App',
	subTitle:'This is a react app',
	options:[]
};

const onFormSubmit =(e)=>{
	e.preventDefault();
	const option = e.target.elements.option.value;
	console.log('entered option',option);
	
	if(option){
		app.options.push(option);
		e.target.elements.option.value ="";
		renderApp();
	}

}

const onMakeDecision=()=>{
	const number = Math.floor((Math.random()*app.options.length));
	alert(app.options[number]);
}
let visibility =false;

const toggleVisibility =()=> {
	visibility = !visibility;
	renderApp();
}


class Person {
	constructor(name='Anonymous',age=0){
		this.name= name;
		this.age =age;
	}
	getGreetings(){
		return `Hi . I am ${this.name} and ${this.age} years old !!!`;
		//return 'Hi. I am '+this.name+' and '+this.age+' years old !!!!'
	}
}

//subclasses
class Student extends Person{
	constructor(name,age,major){
		super(name,age);
		this.major = major;
	}
	hasMajor(){
		return !!this.major;
	}

	getGreetings(){
		let greeting = super.getGreetings();

		if(this.hasMajor()){
			greeting +=` And I have major in ${this.major}`;	
		}
		return greeting;
	}
}

class Traveller extends Person {
	constructor(name,age,location){
		super(name,age);
		this.location = location;
	}

	getGreetings(){
		let greeting = super.getGreetings();
		if(this.location){
			greeting +=`And I am from ${this.location}`;
		}
		return greeting;
	}
}

const person1 = new Traveller('Dayan Perera',43,'San Rafael');
console.log(person1);
console.log(person1.getGreetings());

const person2 = new Traveller();
console.log(person2.getGreetings());

const renderApp =() =>{
	let i=0;
	const template =(
		<div>
			<h1>{app.title ? app.title :"Title does not exist !!"}</h1>
			{app.subTitle && <p>{app.subTitle}</p>}
			{(app.options && app.options.length >0)&& <p>Options :{app.options[0]},{app.options[1]}</p>}
			<button disabled={app.options.length===0} onClick={onMakeDecision}>What Should I Do ? </button>
			<ul>
				{
					app.options.map((opt)=>{
					i++;
					return (<li key={i}>{opt}</li>);
					})
				}
			</ul>
			<form onSubmit={onFormSubmit}>
				<input type="text" name="option"/>
				<button>Add a option</button>
			</form>

			<button onClick={toggleVisibility}>{visibility? 'Hide Details':'Show Details'}</button>
			{visibility&& <h1>Here is the details you expect to see .</h1>}
		</div>
		);

	ReactDOM.render(template,document.getElementById("app"));
}

renderApp();