import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

// Set chai to use chaiHttp for server
chai.should();
chai.use(chaiHttp);

describe('Start app', () => {
    it('should return main page /', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should post an sms /sms', (done) => {
        const smsData = {
            sender: 'Ezrqn Kemboi',
            receiver: 'CoGrammar Team',
            message: 'Thank you for taking time for reviewing my work',
            status: 'sending'
        }
        chai.request(app)
            .post('/sms')
            .set('content-type', 'application/json')
            .send(smsData)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should create an contact', (done) => {
        const contactData = {
            name: 'Ezrqn Kemboi',
            phoneNumber: '+254724883399'
        }
        chai.request(app)
            .post('/contact')
            .set('content-type', 'application/json')
            .send(contactData)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });

    it('should return 400 error when phon number is blnk', (done) => {
        const contactDataWithoutName = {
            phoneNumber: '+1294479083339'
        }
        chai.request(app)
            .post('/contact')
            .set('content-type', 'application/json')
            .send(contactDataWithoutName)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('should get all sms send in the system', (done) => {
        chai.request(app)
            .get('/sms')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
});
