const emotion = require('@emotion/react');
const { createSerializer, matchers } = require('@emotion/jest');

expect.addSnapshotSerializer(createSerializer(emotion));
expect.extend(matchers);
