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
    await peopleData.delete();
    return {
        statusCode: 200,
        body: 'Successfully deleted'
    }
}