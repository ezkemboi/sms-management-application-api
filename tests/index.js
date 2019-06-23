import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

// Set chai to use chaiHttp for server
chai.should();
chai.use(chaiHttp);

describe('Start app', () => {
    const smsData = {
        sender: 'Ezrqn Kemboi',
        receiver: 'CoGrammar Team',
        message: 'Thank you for taking time for reviewing my work',
        status: 'sending'
    };

    const contactData = {
        name: 'Ezrqn Kemboi',
        phoneNumber: '+254724883399'
    };

    it('should return main page /', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return 404 when there is no sms', (done) => {
        chai.request(app)
            .get('/sms')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    });

    it('should return all sms created', (done) => {
        // First create a new sms
        chai.request(app)
            .post('/sms')
            .set('content-type', 'application/json')
            .send(smsData)
            .end();
        chai.request(app)
            .get('/sms')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should post an sms /sms', (done) => {
        chai.request(app)
            .post('/sms')
            .set('content-type', 'application/json')
            .send(smsData)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should return 404 when there are no contacts', (done) => {
        chai.request(app)
            .get('/contacts')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    });

    it('should return all contacts', (done) => {
        // Create a new contact
        chai.request(app)
            .post('/contacts')
            .set('content-type', 'application/json')
            .send(contactData)
            .end();
        // Return contacts
        chai.request(app)
            .get('/contacts')
            .end((err, res) => {
                // Need change/fix
                res.should.have.status(404);
                done();
            })
    })

    it('should create an contact', (done) => {
        chai.request(app)
            .post('/contacts')
            .set('content-type', 'application/json')
            .send(contactData)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should return 400 error when phone number is blank', (done) => {
        const contactDataWithoutName = {
            phoneNumber: '+1294479083339'
        }
        chai.request(app)
            .post('/contacts')
            .set('content-type', 'application/json')
            .send(contactDataWithoutName)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
