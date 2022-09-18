import { gql } from "@apollo/client";

export const HOMEPAGE = gql`
  query {
    page(where: { slug: "home" }) {
      homepage {
        slider {
          videos(first: 15) {
            id
            videoType
            videoInfo {
              title
              banner {
                url
              }
              slug
              videoLogo {
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
        showcase {
          id
          title
          videos(first: 15) {
            id
            videoType
            videoInfo {
              slug
              thumbnails {
                horizontal {
                  url
                }
                vertical {
                  url
                }
              }
            }
          }
        }
        brands {
          id
          name
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

export const BRAND_PAGE = gql`
  query brandPage($slug: String!) {
    brand(where: { slug: $slug }) {
      name
      backgroundVideo {
        url
      }
      backgroundImage {
        url
      }
    }
    videos(where: { videoInfo: { brand: { slug: $slug } } }) {
      id
      videoType
      videoInfo {
        slug
        thumbnails {
          horizontal {
            url
          }
          vertical {
            url
          }
        }
      }
    }
  }
`;

export const VIDEOS_BY_TYPE = gql`
  query Videos($videoType: VideoType!) {
    videos(where: { videoType: $videoType }, first: 50) {
      id
      videoInfo {
        thumbnails {
          horizontal {
            url
          }
          vertical {
            url
          }
        }
        slug
        genre
      }
    }
  }
`;

export const ORIGINALS_VIDEOS = gql`
  query Originals($isOriginal: Boolean!) {
    videos(where: { videoInfo: { original: $isOriginal } }, first: 50) {
      id
      videoType
      videoInfo {
        thumbnails {
          horizontal {
            url
          }
          vertical {
            url
          }
        }
        slug
        genre
      }
    }
  }
`;

export const VIDEO_BY_SLUG = gql`
  query Video($videoType: VideoType!, $slug: String!) {
    videos(where: { videoType: $videoType, videoInfo: { slug: $slug } }) {
      id
      videoInfo {
        title
        description
        releaseYear
        genre
        banner {
          url
        }
        videoLogo {
          url
        }
        slug
      }
    }
  }
`;

export const VIDEO_BY_ID = gql`
  query Videos($id: ID!) {
    video(where: { id: $id }) {
      mp4 {
        url
      }
    }
  }
`;

export const VIDEOS_BY_WATCHLIST = gql`
  query Watchlist($profileID: ID!) {
    profile(where: { id: $profileID }) {
      watchlist(first: 50) {
        id
        videoType
        videoInfo {
          thumbnails {
            horizontal {
              url
            }
            vertical {
              url
            }
          }
          slug
        }
      }
    }
  }
`;

export const PROFILES = gql`
  query Profiles($firestoreId: String!) {
    profiles(where: { account: { firestoreId: $firestoreId } }) {
      id
      username
      avatarUrl
    }
  }
`;

export const PROFILE = gql`
  query Profile($id: ID!) {
    profile(where: { id: $id }) {
      username
      avatarUrl
    }
  }
`;

export const IS_IN_WATCHLIST = gql`
  query Watchlist($profileID: ID!, $videoTitle: String!) {
    profile(where: { id: $profileID }) {
      watchlist(where: { videoInfo: { title: $videoTitle } }) {
        id
      }
    }
  }
`;
