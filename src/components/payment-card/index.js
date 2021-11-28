import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/react";
import { cardBrands, funding } from "@config/constants/stripe";

const PaymentCard = ({
  brand,
  expirationYear,
  expirationMonth,
  funding: fundingType,
  last4,
  extra,
  ...props
}) => {
  return (
    <Flex
      borderWidth={2}
      p={5}
      borderRadius={10}
      borderColor="gray.300"
      alignItems="center"
      {...props}
    >
      <Box
        as="img"
        height={8}
        alt={cardBrands[brand].name}
        src={cardBrands[brand].icon}
        mr={5}
      />
      <Box flex={1}>
        <Flex justifyContent="space-between">
          <Text fontWeight="600" fontSize={20}>
            **** **** **** {last4}
          </Text>
          {extra}
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize={14} color="gray.400">
            {expirationMonth} / {expirationYear}
          </Text>
          <Text fontSize={14} color="gray.400">
            {funding[fundingType]}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

PaymentCard.defaultProps = {
  extra: undefined,
};

PaymentCard.propTypes = {
  brand: PropTypes.oneOf(Object.keys(cardBrands)).isRequired,
  expirationYear: PropTypes.number.isRequired,
  expirationMonth: PropTypes.number.isRequired,
  funding: PropTypes.oneOf(Object.keys(funding)).isRequired,
  last4: PropTypes.string.isRequired,
  extra: PropTypes.node,
};

export default PaymentCard;
