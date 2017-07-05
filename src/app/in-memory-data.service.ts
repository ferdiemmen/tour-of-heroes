
import { InMemoryDbService } from 'angular-in-memory-web-api';

import * as moment from 'moment';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id: 0, title: 'Zero', publishDate: moment().format()},
      { id: 11, title: 'Mr. Nice', publishDate: moment().format() },
      { id: 12, title: 'Narco', publishDate: moment().format() },
      { id: 13, title: 'Bombasto', publishDate: moment().format(), category: { id: 2, name: 'Review', slug: 'review' } },
      { id: 14, title: 'Celeritas', publishDate: moment().format() },
      { id: 15, title: 'Magneta', publishDate: moment().format() },
      { id: 16, title: 'RubberMan', publishDate: moment().format() },
      { id: 17, title: 'Dynama', publishDate: moment().format() },
      { id: 18, title: 'Dr IQ', publishDate: moment().format() },
      { id: 19, title: 'Magma', publishDate: moment().format() },
      { id: 20, title: 'Tornado', publishDate: moment().format() }
    ];
    const categories = [
      { id: 1, name: 'Nieuws', slug: 'nieuws' },
      { id: 2, name: 'Review', slug: 'review' },
      { id: 3, name: 'Algemeen', slug: 'algemeen' },
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

    return {articles: articles, categories: categories, user: user};
  }
}
