import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'react-feather';
import {
 Button,
 Card,
 CardBody,
 Col,
 Form,
 FormGroup,
 Input,
 Row,
 Label,
} from 'reactstrap';
import {
 Navbar,
 NavItem,
 NavbarToggler,
 Collapse,
 NavLink,
 Nav,
 NavbarBrand,
} from 'reactstrap';
import './style.css';

const CovidForm = () => {
 // Collapse isOpen State
 const [isOpen, setIsOpen] = React.useState(false);

 return (
  <div>
   <Row>
    <Col sm={12}>
     <Navbar color='white' light expand='md'>
      <div className='header'>
       <Row>
        <Col sm={12} md={2}>
         <Row>
          <NavbarToggler
           className='ml40'
           onClick={() => {
            setIsOpen(!isOpen);
           }}
          />
          <Col xs={6}>
           <NavbarBrand className='logo' href='/'>
            <h3>Logo</h3>
           </NavbarBrand>
          </Col>
         </Row>
        </Col>
        <Col sm={12} md={10}>
         <Collapse isOpen={isOpen} navbar>
          <Row style={{ width: '100%' }}>
           <Col sm={12} md={8} lg={9}>
            <Nav className='header-navbar' navbar>
             <NavItem>
              <NavLink href='#'>Home</NavLink>
             </NavItem>
             <NavItem>
              <NavLink href='#'>About</NavLink>
             </NavItem>
             <NavItem>
              <NavLink href='#'>Contact Us</NavLink>
             </NavItem>
            </Nav>
           </Col>
           <Col sm={12} md={4} lg={3}>
            <div className='buttons'>
             <Button className='btn outline-btn'>Login</Button>
             <Button className='btn solid-btn'>SignUp</Button>
            </div>
           </Col>
          </Row>
         </Collapse>
        </Col>
       </Row>
      </div>
     </Navbar>

     <div className='bg-body'>
      <div className='bg-body-content'>
       <Row>
        <Col sm={12}>
         <h3>Join My Covid Connect</h3>
        </Col>
        <Col sm={12}>
         <p>
          MyCOVIDCConnect Increases visibility for healthcare providers and
          helps match patients to healthcare providers to keep our communities
          healthy and safe.
         </p>
        </Col>
        <Col sm={12}>
         <p>Submit the onboarding form below to get started.</p>
        </Col>
       </Row>
      </div>
     </div>

     <div>
      <Row className='d-flex justify-content-center'>
       <Col xs={10} sm={10} md={8}>
        <Card className='covid-card'>
         <CardBody>
          <Row className='covid-card-body'>
           <Col sm={12}>
            <div className='header'>
             <p>Healthcare Provider</p>
            </div>
           </Col>
           <Col sm={12}>
            <div className='hr'></div>
           </Col>

           <Col sm={12}>
            <div className='form'>
             <Form>
              <Row>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Organization Name</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Organization Type</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>License or Registration Number</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Incorporation Date</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Address/ City/ State/ Country</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Phone Number</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Email</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
              </Row>
             </Form>
            </div>
           </Col>

           <div className='mt20'>
            <Col sm={12}>
             <div className='header'>
              <p>Key Contact</p>
             </div>
            </Col>
            <Col sm={12}>
             <div className='hr2'></div>
            </Col>
           </div>

           <Col sm={12}>
            <div className='form'>
             <Form>
              <Row>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Name</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Phone Number</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12} md={3}>
                   <Label>Email</Label>
                  </Col>
                  <Col sm={12} md={9}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
              </Row>
             </Form>
            </div>
           </Col>

           <div className='mt20'>
            <Col sm={12}>
             <div className='header'>
              <p>Coronavirus Services</p>
             </div>
            </Col>
            <Col sm={12}>
             <div className='hr'></div>
            </Col>
           </div>

           <Col sm={12}>
            <div className='form'>
             <Form>
              <Row>
               <Col sm={12}>
                <FormGroup>
                 <Row>
                  <Col sm={12}>
                   <Label>What services does your organization provide?</Label>
                  </Col>
                  <Col sm={12}>
                   <Input type='text'></Input>
                  </Col>
                 </Row>
                </FormGroup>
               </Col>
               <Col sm={12}>
                <Label>
                 Please provide quantities for following if applicable:
                </Label>
               </Col>
               <Col sm={12}>
                <Row className='mt20'>
                 <Col sm={6}>
                  <FormGroup>
                   <Row>
                    <Col sm={12} lg={6}>
                     <Label>Icu Beds</Label>
                    </Col>
                    <Col sm={12} lg={6} className='justify-content-start'>
                     <Input type='text'></Input>
                    </Col>
                   </Row>
                  </FormGroup>
                 </Col>
                 <Col sm={6}>
                  <FormGroup>
                   <Row>
                    <Col sm={12} lg={6}>
                     <Label>Non-Ventilator Beds</Label>
                    </Col>
                    <Col sm={12} lg={6} className='justify-content-start'>
                     <Input type='text'></Input>
                    </Col>
                   </Row>
                  </FormGroup>
                 </Col>
                 <Col sm={6}>
                  <FormGroup>
                   <Row>
                    <Col sm={12} lg={6}>
                     <Label>Non-ICU Beds</Label>
                    </Col>
                    <Col sm={12} lg={6} className='justify-content-start'>
                     <Input type='text'></Input>
                    </Col>
                   </Row>
                  </FormGroup>
                 </Col>
                 <Col sm={6}>
                  <FormGroup>
                   <Row>
                    <Col sm={12} lg={6}>
                     <Label>Department</Label>
                    </Col>
                    <Col sm={12} lg={6} className='justify-content-start'>
                     <Input type='text'></Input>
                    </Col>
                   </Row>
                  </FormGroup>
                 </Col>
                 <Col sm={6}>
                  <FormGroup>
                   <Row>
                    <Col sm={12} lg={6}>
                     <Label>Ventilator Beds</Label>
                    </Col>
                    <Col sm={12} lg={6} className='justify-content-start'>
                     <Input type='text'></Input>
                    </Col>
                   </Row>
                  </FormGroup>
                 </Col>
                 <Col sm={12}>
                  <FormGroup>
                   <Input type='checkbox' />
                   <Label className='ml40'>
                    I understands that this form is storing submitted
                    information so I can contact.
                   </Label>
                  </FormGroup>
                 </Col>
                </Row>
               </Col>
               <Col sm={12}>
                <div className='d-flex justify-content-center mt10'>
                 <Button className='btn solid-btn'>Submit</Button>
                </div>
               </Col>
              </Row>
             </Form>
            </div>
           </Col>
          </Row>
         </CardBody>
        </Card>
       </Col>
      </Row>
     </div>

     <div className='bg-footer'>
      <Col sm={12}>
       <Row>
        <Col sm={6} md={3}>
         <div className='links'>
          <h5>Links</h5>
          <p>About XCOV19</p>
          <p>Contact us</p>
          <p>Privacy Polocy</p>
          <p>Learn more</p>
         </div>
        </Col>
        <Col sm={6} md={5}>
         <div className='footer-logo-container'>
          <Row>
           <Col sm={12}>
            <div className='footerlogo'>
             <h5>Logo</h5>
            </div>
           </Col>
           <Col sm={12}>
            <hr />
           </Col>
           <Col sm={12}>
            <div className='icons'>
             <Facebook className='fb' />
            </div>
            <div className='icons'>
             <Instagram className='insta' />
            </div>
            <div className='icons'>
             <Youtube className='yt' />
            </div>
            <div className='icons'>
             <Twitter className='twt' />
            </div>
           </Col>
          </Row>
         </div>
        </Col>
        <Col sm={6} md={4}>
         <div className='join-now mt10'>
          <h5>Join Our Community</h5>
          <div className='mt25'>
           <Button className='btn solid-btn'>Join Now</Button>
          </div>
         </div>
        </Col>
       </Row>
      </Col>
     </div>
    </Col>
   </Row>
  </div>
 );
};

export default CovidForm;
