import { useQuery } from "@apollo/client";
import { PageContainer } from "@components/layouts";
import { VisuallyHidden } from "@components/radixUI";
import { Loading } from "@components/widgets";
import { IS_IN_WATCHLIST } from "@core/graphql";
import { useProfile } from "@core/hooks";
import { DisplayVideoDetailsProps, IsInWatchlistQuery } from "@core/types";
import Image from "next/image";
import Link from "next/link";
import { Check, FilmStrip, Play, Plus } from "phosphor-react";

export const DisplayVideoDetails = ({
  videoID,
  videoInfo,
}: DisplayVideoDetailsProps) => {
  const { selectedProfile } = useProfile();
  const { data, loading, error, refetch } = useQuery<IsInWatchlistQuery>(
    IS_IN_WATCHLIST,
    {
      variables: {
        profileID: selectedProfile?.id,
        videoTitle: videoInfo.title,
      },
    }
  );

  const isInWatchlist = data?.profile.watchlist[0]?.id ?? null;

  return (
    <>
      <div className="absolute top-0 left-0 w-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={videoInfo.banner.url}
          alt={`${videoInfo.title}-banner`}
          className="object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen bg-gradient-to-b from-transparent to-base-100" />

      <PageContainer headTitle={`Disney+ clone | ${videoInfo.title}`}>
        <main className="mb-12 pt-[60vw] lg:pt-32 text-center lg:text-start z-10">
          <VisuallyHidden>
            <h1>{videoInfo.title}</h1>
          </VisuallyHidden>

          <div className="relative max-w-[305px] aspect-video mx-auto lg:mx-0">
            <Image
              src={videoInfo.videoLogo.url}
              alt={`${videoInfo.title} logo`}
              layout="fill"
            />
          </div>

          <section className="mb-12 lg:mb-10 flex flex-col justify-center gap-2 lg:gap-0 text-sm font-semibold text-white">
            <span>{videoInfo.releaseYear}</span>

            <span>
              {videoInfo.genre
                .map((item) => {
                  switch (item) {
                    case "animal_nature":
                      return "Animal & Nature";

                    case "police_cop":
                      return "Police/Cop";

                    case "science_fiction":
                      return "Science Fiction";

                    case "super_hero":
                      return "Super Hero";

                    default:
                      return item[0].toUpperCase() + item.slice(1);
                  }
                })
                .join(", ")}
            </span>
          </section>

          <div className="mb-16 lg:mb-8 flex flex-col lg:flex-row items-center gap-4">
            <Link href={`/video/${videoID}`}>
              <a className="btn w-full lg:w-[200px] bg-white hover:brightness-75 hover:bg-white text-black border-0">
                <Play weight="fill" size={20} />
                <strong className="ml-4 font-semibold">Play</strong>
              </a>
            </Link>

            <div className="flex gap-8 lg:gap-4">
              <button className="relative p-1 flex flex-col justify-center items-center bg-black border border-white rounded-full hover:brightness-75 transition-all">
                {loading && <Loading />}

                {!loading &&
                  (isInWatchlist ? (
                    <Check size={32} color="blue" />
                  ) : (
                    <Plus size={32} color="white" />
                  ))}

                <span className="absolute -bottom-12 lg:hidden">
                  Add to watchlist
                </span>
              </button>

              <Link href={`/video/${videoID}`}>
                <a className="relative p-1 flex flex-col justify-center items-center bg-black border border-white rounded-full hover:brightness-75 transition-all">
                  <FilmStrip size={32} color="white" />
                  <span className="absolute -bottom-12 lg:hidden">Trailer</span>
                </a>
              </Link>
            </div>
          </div>

          <article className="mb-12 text-white text-xl">
            <p className="lg:max-w-[75%]">{videoInfo.description}</p>
          </article>
        </main>
      </PageContainer>
    </>
  );
};
