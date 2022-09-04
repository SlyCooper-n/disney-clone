import { gql } from "@apollo/client";

export const HOMEPAGE = gql`
  query {
    page(where: { slug: "home" }) {
      homepage {
        slider {
          videos {
            id
            videoInfo {
              banner {
                url
              }
              brand {
                brandLogo {
                  url
                }
              }
            }
          }
        }
        brands {
          id
          slug
          brandLogo {
            url
          }
          backgroundGif {
            url
          }
        }
      }
    }
  }
`;
