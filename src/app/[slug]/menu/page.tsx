interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

export const RestaurantPage = async (props: RestaurantPageProps) => {
    const { slug } = await props.params
    
  return (
    <div>
      <h1>sdasd</h1>
    </div>
  );
};
