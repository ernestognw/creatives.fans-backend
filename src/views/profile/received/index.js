import PropTypes from "prop-types";
import SupportList from "@components/support-list";
import { useQuery } from "@apollo/client";
import { sortOrders } from "@config/constants";
import { searchableFields, sortableFields } from "@config/constants/supports";
import { GET_SUPPORTS_RECEIVED } from "./requests";

const pageSize = 10;

const Received = ({ creative }) => {
  const variables = {
    search: {},
    params: {
      page: 1,
      pageSize,
    },
    creative: {
      eq: creative,
    },
    sortBy: {
      field: sortableFields.createdAt,
      order: sortOrders.desc,
    },
  };

  const { data, loading, refetch, fetchMore } = useQuery(
    GET_SUPPORTS_RECEIVED,
    {
      variables,
      skip: !creative,
      nextFetchPolicy: "cache-first",
    }
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

Received.defaultProps = {
  creative: false,
};

Received.propTypes = {
  creative: PropTypes.string,
};

export default Received;
