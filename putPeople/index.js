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

exports.handler = async (event) => {
   let peopleData = await PeopleModel.query('id').eq(event.pathParameters.id).exec();
   let parsedData = JSON.parse(peopleData);
   let parsedBody = JSON.parse(event.body);
   parsedData.name = parsedBody.name;
   let updatedPeople = new PeopleModel(parsedData);
   updatedPeople.save();
   return {
    statusCode: 200,
    body: 'Successfully updated'
   }
}