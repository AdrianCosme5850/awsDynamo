'use strict';

const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    }
})

const PeopleModel = dynamoose.model('people', schema);

exports.handler = async(event) => {
    if(event.pathParameters && event.pathParameters.id){
        peopleData = await PeopleModel.query('id').eq(event.pathParameters.id).exec();
    } else {
        peopleData = await PeopleModel.scan().exec();
    }
    return {
        statusCode: 200,
        body: JSON.stringify(peopleData)
    }
}