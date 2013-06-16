var MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
db;
// var csv = require('csv');
var fs = require('fs');

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("courseapi");
    db.collection('courses', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'courses' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});


exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('courses', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};


exports.findAll = function(req, res) {
    var title = req.query["TITLE"];
    db.collection('courses', function(err, collection) {
        if (title) {
            collection.find({"TITLE": new RegExp(title, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Seed initial data for now...
var populateDB = function() {

    console.log("Populating courses database...");
    var courses = [{"AVAIL":"    0","CAMPUS":"LAW","COLLEGE":"WC","COMMENTS":"Dean Signature Required","COREQS":null,"CRN":"[22017]","CRS":"115","DAYS":null,"ENRL":"    1","FIRECAP":null,"GLOB_CAP":null,"INSTRUCTORS":"Walker (Charles J.)","LEVEL":"UG","LOC_CAP":"    1","MAX_CRED":"     ","MIN_CRED":"  2.0","PREREQS":null,"RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":null,"SEC":"02","STAT":"CLSD","SUBJ":"VC","TIME":null,"TITLE":"SS: English & Italian Dection","id":1449,"requisite_id":null},{"AVAIL":"    0","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":"Academic Coordinator Signature","COREQS":null,"CRN":"[22042]","CRS":"491","DAYS":null,"ENRL":"    1","FIRECAP":null,"GLOB_CAP":null,"INSTRUCTORS":"Mills (Miriam N.)","LEVEL":"UG","LOC_CAP":"    1","MAX_CRED":" 12.0","MIN_CRED":"  1.0","PREREQS":null,"RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":null,"SEC":"01","STAT":"CLSD","SUBJ":"THE","TIME":null,"TITLE":"Internship in Theatre","id":1448,"requisite_id":null},{"AVAIL":"    1","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":"Academic Coordinator Signature","COREQS":null,"CRN":"[22124]","CRS":"490","DAYS":null,"ENRL":"    0","FIRECAP":null,"GLOB_CAP":null,"INSTRUCTORS":"Fuller (Ivan)","LEVEL":"UG","LOC_CAP":"    1","MAX_CRED":"  4.0","MIN_CRED":"  1.0","PREREQS":null,"RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":null,"SEC":"02","STAT":"OPEN","SUBJ":"THE","TIME":null,"TITLE":"IS:Cont Dramatic Lit","id":1447,"requisite_id":null},{"AVAIL":"    0","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":"Academic Coordinator Signature","COREQS":null,"CRN":"[22064]","CRS":"490","DAYS":null,"ENRL":"    1","FIRECAP":null,"GLOB_CAP":null,"INSTRUCTORS":"Simon (Rebecca L.)","LEVEL":"UG","LOC_CAP":"    1","MAX_CRED":"  4.0","MIN_CRED":"  1.0","PREREQS":null,"RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":null,"SEC":"01","STAT":"CLSD","SUBJ":"THE","TIME":null,"TITLE":"IS: Linklater Technique","id":1446,"requisite_id":null},{"AVAIL":"   -2","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":null,"COREQS":null,"CRN":"[20463]","CRS":"410","DAYS":"TTH","ENRL":"   18","FIRECAP":"250","GLOB_CAP":null,"INSTRUCTORS":"Andrews (Anne M.)","LEVEL":"UG","LOC_CAP":"   16","MAX_CRED":"     ","MIN_CRED":"  3.0","PREREQS":"THE 107 and THE 110","RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":"249","SEC":"O1","STAT":"CLSD","SUBJ":"THE","TIME":"04:30PM-06:00PM","TITLE":"Advanced Performance Workshop","id":1445,"requisite_id":null},{"AVAIL":"    3","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":null,"COREQS":null,"CRN":"[20462]","CRS":"410","DAYS":"MWF","ENRL":"   13","FIRECAP":"20","GLOB_CAP":null,"INSTRUCTORS":"Mills (Miriam N.)","LEVEL":"UG","LOC_CAP":"   16","MAX_CRED":"     ","MIN_CRED":"  3.0","PREREQS":"THE 107 and THE 110","RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":"19","SEC":"C1","STAT":"OPEN","SUBJ":"THE","TIME":"10:20AM-11:20AM","TITLE":"Advanced Performance Workshop","id":1444,"requisite_id":null},{"AVAIL":"    5","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":null,"COREQS":null,"CRN":"[20460]","CRS":"400","DAYS":"MW","ENRL":"   10","FIRECAP":"92","GLOB_CAP":null,"INSTRUCTORS":"Mills (Miriam N.)","LEVEL":"UG","LOC_CAP":"   15","MAX_CRED":"     ","MIN_CRED":"  3.0","PREREQS":"THE 107 and THE 110 and THE 115","RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":"91","SEC":"I1","STAT":"OPEN","SUBJ":"THE","TIME":"02:50PM-04:20PM","TITLE":"Directing","id":1443,"requisite_id":null},{"AVAIL":"    1","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":"Instructor Signature Required","COREQS":null,"CRN":"[20459]","CRS":"312","DAYS":null,"ENRL":"   19","FIRECAP":null,"GLOB_CAP":null,"INSTRUCTORS":"Chmel (Patrick J.)","LEVEL":"UG","LOC_CAP":"   20","MAX_CRED":"     ","MIN_CRED":"  3.0","PREREQS":null,"RESTRICTIONS":"| ONLY Undergraduate","RM_CAP":null,"SEC":"01","STAT":"OPEN","SUBJ":"THE","TIME":null,"TITLE":"The Arts Abroad","id":1442,"requisite_id":null},{"AVAIL":"    2","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":null,"COREQS":null,"CRN":"[20458]","CRS":"306","DAYS":null,"ENRL":"   13","FIRECAP":null,"GLOB_CAP":null,"INSTRUCTORS":"Chmel (Patrick J.)","LEVEL":"UG","LOC_CAP":"   15","MAX_CRED":"     ","MIN_CRED":"  3.0","PREREQS":"2.5 GPA","RESTRICTIONS":"| ONLY Undergraduate| ONLY Continuing Studies","RM_CAP":null,"SEC":"OL1","STAT":"OPEN","SUBJ":"THE","TIME":null,"TITLE":"American Theatre History","id":1441,"requisite_id":null},{"AVAIL":"   -1","CAMPUS":"LAW","COLLEGE":"FP","COMMENTS":null,"COREQS":null,"CRN":"[21706]","CRS":"240","DAYS":"MWF","ENRL":"   26","FIRECAP":"29","GLOB_CAP":null,"INSTRUCTORS":"Fuller (Ivan)","LEVEL":"UG","LOC_CAP":"   25","MAX_CRED":"     ","MIN_CRED":"  3.0","PREREQS":"THE 107 UG D","RESTRICTIONS":null,"RM_CAP":"28","SEC":"B1","STAT":"CLSD","SUBJ":"THE","TIME":"09:10AM-10:10AM","TITLE":"Script Analysis","id":1440,"requisite_id":null}];

    db.collection('courses', function(err, collection) {
        collection.insert(courses, {safe:true}, function(err, result) {});
    });

};

var csv = require('csv');
console.log("hello");
console.log(__dirname);

csv().from.stream(fs.createReadStream(__dirname+'/trees.csv')).to.path(__dirname+'/sample.csv').transform( function(row){
  row.unshift(row.pop());
  return row;
}).on('record', function(row,index){
  console.log('#'+index+' '+JSON.stringify(row));
}).on('close', function(count){
  console.log('Number of lines: '+count);
})
.on('error', function(error){
  console.log(error.message);
});
