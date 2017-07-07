
import { InMemoryDbService } from 'angular-in-memory-web-api';

import * as moment from 'moment';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id: 11, title: 'Mr. Nice', subtitle: 'guy', publishDate: moment().format(), category: { id: 1, name: 'Nieuws', slug: 'nieuws' },
        'RATable': [{ id: 1, name: 'Gamer.nl feed voor Gamingtotaal', default: true }] },
      { id: 12, title: 'Narco', subtitle: '', publishDate: moment().format(), category: { id: 2, name: 'Review', slug: 'review' } },
      { id: 13, title: 'Bombasto', subtitle: '', publishDate: moment().format(), category: { id: 3, name: 'Algemeen', slug: 'algemeen' } },
      { id: 14, title: 'Celeritas', subtitle: '', publishDate: moment().format(), category: { id: 2, name: 'Review', slug: 'review' } },
      { id: 15, title: 'Magneta', subtitle: '', publishDate: moment().format(), category: { id: 1, name: 'Nieuws', slug: 'nieuws' } },
      { id: 16, title: 'RubberMan', subtitle: '', publishDate: moment().format(), category: { id: 1, name: 'Nieuws', slug: 'nieuws' } },
      { id: 17, title: 'Dynama', subtitle: '', publishDate: moment().format(), category: { id: 1, name: 'Nieuws', slug: 'nieuws' } },
      { id: 18, title: 'Dr IQ', subtitle: '', publishDate: moment().format(), category: { id: 1, name: 'Nieuws', slug: 'nieuws' } },
      { id: 19, title: 'Magma', subtitle: '', publishDate: moment().format(), category: { id: 1, name: 'Nieuws', slug: 'nieuws' } },
      { id: 20, title: 'Tornado', subtitle: '', publishDate: moment().format(), category: { id: 3, name: 'Algemeen', slug: 'algemeen' } }
    ];
    const categories = [
      { id: 1, name: 'Nieuws', slug: 'nieuws' },
      { id: 2, name: 'Review', slug: 'review' },
      { id: 3, name: 'Algemeen', slug: 'algemeen' }
    ];
    const authors = [
      { id: 1, username: 'Apenbroek', slug: 'apenbroek' },
      { id: 2, username: 'Broekpak', slug: 'broekpak' },
      { id: 3, username: 'Tsja', slug: 'tsja' }
    ];
    const feeds = [
      { id: 1, name: 'Gamer.nl feed voor Gamingtotaal', default: true },
      { id: 2, name: 'Gamer.nl feed voor Computer!Totaal' },
      { id: 3, name: 'Gamer.nl RSS', default: true },
      { id: 4, name: 'Gamer.nl nieuws voor NU.nl' }
    ];
    const user = {
      id: 88141,
      followers: 0,
      csrftoken: 'Hz4amVof2a9DpmaQfigeJ5XqbQSUpRY2',
      message: '',
      achievements: [],
      address: '',
      agreedApiShare: 0,
      apiProfileUrl: 'https://api.reshift.nl/accounts/glitchff/',
      avatar: {id: 433798},
      bio: '',
      birthday: null,
      city: '',
      contests: 0,
      dateJoined: '2016-09-01T14:06:37',
      email: 'fjemmen@gmail.com',
      exp: 0,
      expiryTime: 60,
      facebook: '',
      firstName: '',
      forumMessageEmail: false,
      friendMessageEmail: false,
      frontendUrls: {2: '/profiel/glitchff/', 6: '/gebruikers/glitchff/', 7: '/profiel/glitchff/', 8: '/profiel/glitchff/'},
      gender: 'X',
      googleplus: '',
      group: [],
      image: 433799,
      imageSerialized: {id: 433799},
      isActive: true,
      isAuthor: [],
      isStaff: true,
      isSubscriber: null,
      isSuperuser: true,
      karma: 0,
      lastDateOfReceivingPoints: '2016-09-01T14:06:37.402178',
      lastLogin: '2017-06-23T11:07:02.117179',
      lastName: '',
      lastPostDate: null,
      lastSeen: '2017-07-03T14:56:14.126754',
      level: 1,
      levelToSeePosts: 0,
      listed: true,
      magazine: 0,
      moderatePoints: 0,
      moderatePointsLostSinceCreated: 0,
      newsletter: 0,
      notificationExpirationPeriod: 2,
      notificationSendByEmail: 0,
      numPosts: 0,
      partnerMailing: 0,
      postDownvotes: [],
      postUpvotes: [],
      profileCompletion: 80,
      publicMedia: false,
      registrationSite: null,
      relationships: [],
      rights: [{id: 12}, {id: 1}, {id: 7}, {id: 3}, {id: 2}, {id: 5}, {id: 8}, {id: 9}, {id: 6}],
      signature: '',
      slug: 'glitchff',
      subscriptionNumber: '',
      subscriptionStatus: 0,
      superAdmin: true,
      trackTopicAfterPost: false,
      tracking: '',
      twitter: '',
      uploadMediaRights: 1,
      username: 'fjemmen',
      weight: 50,
      zipCode: ''
    };

    return {
      articles: articles,
      authors: authors,
      feeds: feeds,
      categories: categories,
      user: user
    };
  }
}
