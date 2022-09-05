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

export const BRAND_PAGE = gql`
  query brandPage($slug: String!) {
    brand(where: { slug: $slug }) {
      backgroundVideo {
        url
      }
      backgroundImage {
        url
      }
    }
  }
`;

export const VIDEOS_BY_TYPE = gql`
  query Videos($videoType: VideoType!) {
    videos(where: { videoType: $videoType }) {
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
    videos(where: { videoInfo: { original: $isOriginal } }) {
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

export const VIDEO_BY_SLUG = gql`
  query Video($videoType: VideoType!, $slug: String!) {
    videos(where: { videoType: $videoType, videoInfo: { slug: $slug } }) {
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
