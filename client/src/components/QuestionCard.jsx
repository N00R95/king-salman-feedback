import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { styled } from '@mui/material/styles';

// Styled Rating Component
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

// Custom Icons for Sentiment Rating
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

// IconContainer Component for Custom Icons
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

// Main QuestionCard Component
const QuestionCard = ({ question, ratingType, responses, setResponses }) => {
  const [value, setValue] = React.useState(2);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    setResponses({ ...responses, [question]: newValue });
  };

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography variant="h6" component="legend">{question}</Typography>
      {ratingType === 'basic' && (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />
      )}
      {ratingType === 'customized' && (
        <StyledRating
          name="customized-color"
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          onChange={handleRatingChange}
        />
      )}
      {ratingType === 'sentiment' && (
        <StyledRating
          name="highlight-selected-only"
          defaultValue={2}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          onChange={handleRatingChange}
        />
      )}
    </Box>
  );
};

// PropTypes Validation
QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  ratingType: PropTypes.string.isRequired,
  responses: PropTypes.object.isRequired,
  setResponses: PropTypes.func.isRequired,
};

export default QuestionCard;
