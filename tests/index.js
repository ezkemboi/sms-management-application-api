import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

// Set chai to use chaiHttp for server
chai.should();
chai.use(chaiHttp);

describe('Start app', () => {
    const senderData = {
        name: 'Ezrqn Kemboi',
        phoneNumber: '+254724883399'
    };

    const receiverData = {
        name: 'Belio Rotich',
        phoneNumber: '+254724883398'
    };

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
            .send(senderData)
            .end();
        // Return contacts
        chai.request(app)
            .get('/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should create a contact', (done) => {
        chai.request(app)
            .post('/contacts')
            .set('content-type', 'application/json')
            .send(senderData)
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

    it('should return 400 error when all there are some missing fields', (done) => {
        const smsWithoutOnlySender = {
            sender: '+1294479083339'
        }
        chai.request(app)
            .post('/sms')
            .set('content-type', 'application/json')
            .send(smsWithoutOnlySender)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('should post an sms /sms', (done) => {
        // Pass data for sms creations
        const smsData = {
            senderId: 1,
            receiverId: 2,
            message: 'Thank you for taking time for reviewing my work',
            status: 'sending'
        };

        // First create a new sms
        chai.request(app)
            .post('/sms')
            .set('content-type', 'application/json')
            .send(smsData)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should return all sms created', (done) => {
        chai.request(app)
            .get('/sms')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should delete a contact', (done) => {
        chai.request(app)
            .delete("/contacts/1")
            .set('content-type', 'application/json')
            .send(senderData)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
