import type {
  Hero,
  HeroListResponse,
  HeroData,
  HeroDetailResponse,
  HeroSkillList,
  Role,
} from "../types/Hero";

const BASE_API_URL = "https://mlbb-stats.ridwaanhall.com/api";

export const fetchHeroList = async (): Promise<Hero[]> => {
  try {
    const response = await fetch(`${BASE_API_URL}/hero-list/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const heroListData: HeroListResponse = await response.json();

    const heroesWithDetails: Hero[] = await Promise.all(
      heroListData.data.records.map(async (record) => {
        const heroDetail = await fetchHeroDetail(record.data.hero_id);
        const heroData = record.data.hero.data;

        const sortLabels = heroDetail!.sortlabel || [];
        console.log(`Hero: ${heroData.name}, Sort Labels: ${sortLabels}`);

        const roles: Role[] = sortLabels
          .filter((label) => label !== "")
          .map((label) => {
            if (label.includes("Mage")) return "Mage";
            if (label.includes("Fighter")) return "Fighter";
            if (label.includes("Marksman")) return "Marksman";
            if (label.includes("Assassin")) return "Assassin";
            if (label.includes("Tank")) return "Tank";
            if (label.includes("Support")) return "Support";
            return null;
          })
          .filter((role): role is Role => role !== null)
          .filter((role, index, self) => self.indexOf(role) === index);

        return {
          id: record.data.hero_id,
          name: heroData.name,
          headImage: heroData.head,
          smallMapImage: heroData.smallmap,
          roles: roles.length > 0 ? roles : ["Fighter"],
          speciality: heroDetail?.speciality || [],
          skills:
            heroDetail?.heroskilllist.flatMap(
              (skillList: HeroSkillList) => skillList.skilllist
            ) || [],
          story: heroDetail?.story || "",
          tale: heroDetail?.tale || "",
          relations: record.data.relation,
        };
      })
    );

    return heroesWithDetails;
  } catch (error) {
    console.error("Error fetching hero list:", error);
    return [];
  }
};

export const fetchHeroDetail = async (
  heroId: number
): Promise<HeroData | null> => {
  try {
    const response = await fetch(`${BASE_API_URL}/hero-detail/${heroId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const heroDetailData: HeroDetailResponse = await response.json();
    if (
      !heroDetailData.data.records ||
      heroDetailData.data.records.length === 0
    ) {
      return null;
    }
    return heroDetailData.data.records[0].data.hero.data;
  } catch (error) {
    console.error(`Error fetching hero detail for ID ${heroId}:`, error);
    return null;
  }
};
