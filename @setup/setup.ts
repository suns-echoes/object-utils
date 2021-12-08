import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.sinon = sinon;
