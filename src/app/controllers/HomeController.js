module.exports = function ( $scope ) {
  $scope.message = 'Two birds killed by stone!'

var list =  {
    'itemList': [
      {
        'id': 1,
        'itemName': 'Dog',
        'itemDesc': 'Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod elit.'
      },
      {
        'id': 2,
        'itemName': 'Cat',
        'itemDesc': 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        'id': 3,
        'itemName': 'Fish',
        'itemDesc': 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
      }
    ]
  };

  $scope.list = list;
  console.log( list + 'Hallo Test BrowserSync! Test PHASE III ALALABAMBA' );

}
