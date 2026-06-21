import { EventConfig } from './types';
import { Twitch, Youtube } from '@/domains/teams';

const config: EventConfig = {
    event: {
        name: 'HD版クラッシュ2 RTAチームリレー',
        slug: 'crash2-2026',
    },
    teams: [
        {
            name: 'Aチーム',
            players: [
                Twitch('かなな',            'kananann333',   '1372965335'),
                Youtube('ハイシャン',       '@Yang_Haixian', 'UCbryBKo3jzYXLFteXg5QzOQ'),
                Youtube('しずく',           '@aqua_shizuku616', 'UCHBbEkYWSjsnIQ04o2PWffg'),
                Twitch('セレナーデ☆ゆうき', 'serenade_yuuki', '141192479'),
                Twitch('鴉ミドリ',          'karasmidori',   '426713806'),
            ],
        },
        {
            name: 'Bチーム',
            players: [
                Youtube('なかちゃん',       '@island_factory', 'UCBy7rYZdf5h5bVlMH2Mvtlg'),
                Twitch('えかはす',          'ekahs_r',       '125413136'),
                Twitch('ミクロン',          'mikurom12',     '77320242'),
                Twitch('ばたけ。',          'batake_',       '431877586'),
                Twitch('SuperSatoSan',      'supersatosan',  '57348141'),
            ],
        },
        {
            name: 'Cチーム',
            players: [
                Twitch('ふー',             'fuuuuuuu3',     '169549849'),
                Twitch('とよまな',          'toyomana',      '51426379'),
                Twitch('Cma',              'cma2819',       '31809791'),
                Twitch('MrRinku',          'mrrinku_',      '89529986'),
                Twitch('chibi',            'chibi_sms',     '547018944'),
            ],
        },
    ],
};

export default config;
