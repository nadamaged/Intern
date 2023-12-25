import React from "react";
import { useQuery, gql } from "@apollo/client";

interface Country {
  name: string;
  capital: string;
  emoji: string;
  code: string;
  phones: string[];
  currency: string;
  awsRegion: string;
  native: string;
  emojiU: string;
}

interface QueryResult {
  countries: Country[];
}

const QUERY_LIST_OF_COUNTRIES = gql`
  {
    countries {
      name
      capital
      emoji
      code
      phones
      currency
      awsRegion
      native
      emojiU
    }
  }
`;

function Table() {
  const { data, loading, error } = useQuery<QueryResult>(QUERY_LIST_OF_COUNTRIES);

  return (
    <div className="home">
      <div className="title">
        <h1>List Of Countries</h1>
      </div>
      <div className="listOfCountries">
        {loading && <h3>Loading data...</h3>}
        {error && <h3>Error: {error.message}</h3>}
        {data && (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Capital</th>
                <th className="py-2 px-4 border-b">Code</th>
                <th className="py-2 px-4 border-b">Phones</th>
                <th className="py-2 px-4 border-b">AWS Region</th>
                <th className="py-2 px-4 border-b">Native</th>
                <th className="py-2 px-4 border-b">Emoji</th>
              </tr>
            </thead>
            <tbody>
              {data.countries.map((country) => (
                <tr key={country.code} className="country">
                  <td className="py-2 px-4 border-b">{country.name}</td>
                  <td className="py-2 px-4 border-b">{country.capital}</td>
                  <td className="py-2 px-4 border-b">{country.code}</td>
                  <td className="py-2 px-4 border-b">{country.phones.join(', ')}</td>
                  <td className="py-2 px-4 border-b">{country.awsRegion}</td>
                  <td className="py-2 px-4 border-b">{country.native}</td>
                  <td className="py-2 px-4 border-b">{country.emojiU}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

}

export default Table;