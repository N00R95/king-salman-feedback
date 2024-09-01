import { Container, Typography, Box } from '@mui/material';

function AboutUs() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          King Salman Hospital is committed to providing high-quality healthcare services to our community.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUs;
