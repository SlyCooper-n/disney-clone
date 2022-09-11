import { Card } from "@components/widgets";
import { BrandsProps } from "@core/types";

export const Brands = ({ brands }: BrandsProps) => {
  return (
    <section className="mt-12 flex justify-between gap-4">
      {brands.map((brand) => (
        <Card key={brand.id} variant="brand" brandData={brand} />
      ))}
    </section>
  );
};
