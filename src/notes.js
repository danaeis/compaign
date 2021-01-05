 "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwODA0MjU2MSwianRpIjoiMzJlOGVmYjQwYzIzNDZkYzk0NDYxYjNmNTA5NDRhZjMiLCJ1c2VyX2lkIjoyfQ.K9bOFoA0oIQMklmko33jnSuTV-7KZE4C0NLVFQv831o",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA3NDM5NTYxLCJqdGkiOiJhYTkzOWY0ZDViZjM0OTVhYjljMzY4NTcwOTdiNTZlMiIsInVzZXJfaWQiOjJ9.zNqWQ150wfpDq9Bz9XwdNoaqjsyViASuYJfCTuHjeL0"


    Access-Control-Allow-Origin


    temp



 <Card>
              
              <Card.Body>
                <Card.Title>{userCompaigns[1].name}</Card.Title>
                <Card.Text>
                {userCompaigns[1].description}
                </Card.Text>
                <Button>{userCompaigns[1].is_registered ?  "ثبت نام":"ثبت نام شده"} </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            
            <Card>
              
              <Card.Body>
                <Card.Title>{userCompaigns[2].name}</Card.Title>
                <Card.Text>
                {userCompaigns[2].description}
                </Card.Text>
                <Button>{userCompaigns[2].is_registered ? "ثبت نام شده": "ثبت نام"} </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>







    <>
      <CardDeck>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to additional
              content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This card has even longer content than the first to
              show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </>