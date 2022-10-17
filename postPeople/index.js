'use strict';

const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required:true,
    }
})

const PeopleModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
    let parsedData = jSON.parse(event.body)
    let testPeople = new PeopleModel(parsedData)
    let testPush = await testPeople.save();
    return {
        statusCode: 200,
        body: testPush
    }
}