export type Role =
  | "Fighter"
  | "Mage"
  | "Marksman"
  | "Assassin"
  | "Tank"
  | "Support";

export interface HeroSkill {
  skillid: number;
  skillname: string;
  skillicon: string;
  skilldesc: string;
  "skillcd&cost": string;
  skilltag: {
    tagid: number;
    tagname: string;
    tagrgb: string;
  }[];
  skillvideo: string;
}

export interface HeroSkillList {
  skilllistid: string;
  skilllist: HeroSkill[];
}

export interface HeroData {
  heroid: number;
  name: string;
  head: string;
  smallmap: string;
  speciality: string[];
  heroskilllist: HeroSkillList[];
  story: string;
  tale: string;
  sortlabel: string[];
  roadsortlabel: string[];
}

export interface HeroRelation {
  assist: {
    desc: string;
    target_hero_id: number[];
  };
  strong: {
    desc: string;
    target_hero_id: number[];
  };
  weak: {
    desc: string;
    target_hero_id: number[];
  };
}

export interface Hero {
  id: number;
  name: string;
  headImage: string;
  smallMapImage: string;
  roles: Role[];
  speciality: string[];
  skills: HeroSkill[];
  story: string;
  tale: string;
  relations: HeroRelation;
}

export interface HeroListResponse {
  code: number;
  message: string;
  data: {
    records: Array<{
      _id: string;
      caption: string;
      configId: number;
      createdAt: number;
      createdUser: string;
      data: {
        _object: number;
        hero: {
          data: HeroData;
        };
        hero_id: number;
        relation: HeroRelation;
      };
      dynamic: null;
      id: number;
      linkId: number[];
      sort: number;
      updatedAt: number;
      updatedUser: string;
    }>;
    total: number;
  };
}

export interface HeroDetailResponse {
  code: number;
  message: string;
  data: {
    records: Array<{
      _id: string;
      caption: string;
      configId: number;
      createdAt: number;
      createdUser: string;
      data: {
        _object: number;
        hero: {
          data: HeroData;
        };
      };
      dynamic: null;
      id: number;
      linkId: number[];
      sort: number;
      updatedAt: number;
      updatedUser: string;
    }>;
  };
}
