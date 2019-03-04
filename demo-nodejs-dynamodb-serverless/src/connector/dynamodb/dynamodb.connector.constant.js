
const LOCALSTACK = {
    LOCALHOST: '127.0.0.10',
    PORT: '4569',
    AWS_REGION: 'us-east-1'  
};

const LOCALSTACK_OPTIONS = {
    region:  LOCALSTACK.AWS_REGION,
    endpoint: 'http://'+LOCALSTACK.LOCALHOST+':'+LOCALSTACK.PORT
}

const DYNAMODB_LOCAL = {
    LOCALHOST: 'localhost',
    PORT: '8000',
    AWS_REGION: 'us-east-1'
};

const DYNAMODB_LOCAL_OPTIONS = {
    region:  DYNAMODB_LOCAL.AWS_REGION,
    endpoint: 'http://'+DYNAMODB_LOCAL.LOCALHOST+':'+DYNAMODB_LOCAL.PORT
}

const CONFIG_LOCAL_DYNAMODB_DEFAULT = "LOCALSTACK"

const CONFIG_LOCAL_DYNAMODB_OPTIONS = {
    "LOCALSTACK" : LOCALSTACK_OPTIONS,
    "DYNAMODB_LOCAL" : DYNAMODB_LOCAL_OPTIONS,
}

module.exports = {
    CONFIG_LOCAL_DYNAMODB_DEFAULT,
    CONFIG_LOCAL_DYNAMODB_OPTIONS
}
