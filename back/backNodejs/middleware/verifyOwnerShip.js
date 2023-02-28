const { mongoose } = require("mongoose");
const { NotFound, Error, Forbidden } = require("../util/HttpResponse");

function verifyOwnership(resourceIdParam, ownerField, collectionName) {
    const Resource = mongoose.model(collectionName);
  
   return async function (req, res, next) {
      const resourceId = req.params[resourceIdParam];
      const userId = req.userId;
      const found = await Resource.findOne({_id: resourceId})
      if(!found){
        return NotFound(res, "Resource not found");
      }
      Resource.findOne({ _id: resourceId, [ownerField]: userId })
        .then(resource => {
          if (!resource) {
            return Forbidden(res, "you don't have permission");
          }
          req.resource = resource;
          next();
        })
        .catch(err => {
          return Error(res, err.message);
        });
    };
  }

  module.exports = { verifyOwnership}
