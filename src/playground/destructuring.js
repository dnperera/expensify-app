// const person ={
// 	name:'Dasith Perera',
// 	age: 4,
// 	address:{
// 		street :'50 Miller Ranch Ct',
// 		city: 'San Rafael',
// 		zip:94903
// 	}
// }
// const {name:firstName ='Anonymous',age=0,address} = person;
// console.log(`my name is ${firstName} and ${age} is old`);

// const {street,city,zip} = address;
// console.log(`Address is ${street}, ${city}, ${zip}`);

const address =['50 Miller Ranch Ct.','San Rafael',94903,'California'];
const[street,city,,state] = address;
console.log(`Current Address - ${street} ${city} ${state}`);