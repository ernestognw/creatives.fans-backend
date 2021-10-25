import PropTypes from "prop-types";
import SupportList from "@components/support-list";
import { useQuery } from "@apollo/client";
import { searchableFields } from "@config/constants/supports";
import { GET_SUPPORTS_RECEIVED } from "./requests";

const pageSize = 10;

const Sent = ({ fan }) => {
  const variables = {
    search: {},
    params: {
      page: 1,
      pageSize,
    },
    fan: {
      eq: fan,
    },
  };

  const { data, loading, refetch, fetchMore } = useQuery(
    GET_SUPPORTS_RECEIVED,
    { variables, skip: !fan, fetchPolicy: "cache-first" }
  );

  return (
    <SupportList
      mt={5}
      loading={loading}
      onSearch={(search) =>
        refetch({
          ...variables,
          search: searchableFields.reduce((acc, curr) => {
            acc[curr] = search;
            return acc;
          }, {}),
        })
      }
      onLoadMore={() =>
        fetchMore({
          variables: {
            params: {
              pageSize,
              page: data?.supports.info.next,
            },
          },
        })
      }
      info={data?.supports.info}
      supports={data?.supports.results}
    />
  );
};

Sent.defaultProps = {
  fan: false,
};

Sent.propTypes = {
  fan: PropTypes.string,
};

export default Sent;
