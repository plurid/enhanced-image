import gql from 'graphql-tag';



export const DepictImageDataFragment = gql`
    fragment DepictImageDataFragment on DepictImageData {
        imageSHA
        # imageShortSHA
        # imageFilename
        # publicImage
        # uploadedBy
        # user {
        #     username
        # }
        imageText {
            id
            currentVersionId
            versions {
                id
                content
            }
        }
        # createdAt
        # metadata {
        #     title
        #     description
        #     topics {
        #         id
        #         name
        #     }
        #     album {
        #         id
        #         text
        #     }
        #     date {
        #         timestamp
        #         text
        #     }
        #     event {
        #         detimeEventId
        #         text
        #     }
        #     location {
        #         coordinates {
        #             latitude
        #             longitude
        #         }
        #         text
        #     }
        #     technical {
        #         channels
        #         chromaSubsampling
        #         density
        #         format
        #         hasAlpha
        #         height
        #         size
        #         space
        #         width
        #     }
        # }
    }
`;
